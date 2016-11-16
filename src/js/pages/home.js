import React from 'react';
import SearchForm from '../components/search-form';
import HomeActions from '../actions/home';
import HomeStore from '../stores/home';
import Movies from '../components/home/movies';
import Filter from '../components/home/filter';
import { cloneDeep, now, assign } from 'lodash';
import s from '../settings';

const orderBys = cloneDeep(s.SORTABLES);

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = HomeStore.getState();
    }

    componentDidMount() {
        HomeStore.listen(this._onChange.bind(this));
        $(window).on('scroll', this.watch.bind(this));

        if (this.state.movies.length == 0) {
            let opt = {};

            if (this.props.location.query.q) {
                opt.query = this.props.location.query.q;
            } 
            
            this.fetchMovies(this.state.page, false, opt);
        }
    }

    componentWillUnmount() {
        HomeStore.unlisten(this._onChange.bind(this));
        $(window).off('scroll');
    }

    componentWillReceiveProps(nextProps) {
        let { params, location } = this.props;
        
        //new search
        if (nextProps.location.query.q) {
            if (location.query.q != nextProps.location.query.q) {
                HomeActions.setPage(1);
                
                this.fetchMovies(1, false, {
                    query: nextProps.location.query.q
                });
            }
        } else if (location.query.q) {
            //TODO: cache this somehow
            this.fetchMovies(1);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        // HomseStore properties that do not need to trigger a re-render
        if (this.state.page != nextState.page) {
            return false;
        }
        if (this.state.totalPages != nextState.totalPages) {
            return false;
        }

        return true;
    }

    _onChange(state) {
        this.setState(state);
    }

    watch() {
        let scrollTop = $(window).scrollTop();
        let winHeight = $(window).height();
        let docHeight = $(document).height();
        let opt = {};
        
        if (!this.state.isAppending && (this.state.page <= this.state.totalPages)) {
            if (((docHeight - winHeight) - scrollTop) < 1000) {

                if (this.props.location.query.q) {
                    opt.query = this.props.location.query.q;
                }

                this.fetchMovies(this.state.page, true, opt);
            }
        }
        
    }

    fetchMovies(page, append = false, opt = {}) {
        let url;
        let data = {
            api_key: s.API_KEY,
            page: page
        };

        //add in extra options
        assign(data, opt);

        if (data.query) {
            url = s.ENDPOINTS.SEARCH;
        } else {
            url = s.ENDPOINTS.POPULAR;
        }

        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            data: data,
            beforeSend: () => {
                if (!append) {
                    HomeActions.setLoadingState(true);
                }
                HomeActions.toggleAppendingState(true);
            }
        })
            .done((response) => {
                if (append) {
                    HomeActions.appendMovies(response.results);
                } else {
                    HomeActions.loadMovies(response.results);
                }

                HomeActions.setTotalPages(response.total_pages);
                HomeActions.nextPage.defer();
            })
            .always(() => {
                if (!append) {
                    HomeActions.setLoadingState(false);
                }
                HomeActions.toggleAppendingState(false);
            })
            .fail(function(jqXHR, statusText) {
                console.log(statusText);
            });
    }

    handleOrderByChange(val) {
        let key = val ? val.value : null;
        HomeActions.orderBy(key);
    }

    handleFilterByChange(val) {
        let key = val ? val.value : null;
        HomeActions.filterBy(key);
    }

    render() {
        let isLoading = this.state.isLoading ? 'loading' : 'dormant';
        let query = this.props.location.query.q || '';

        return(
            <div className={"home page "+isLoading}>
                <div className="container">
                    <div className="heading">
                        <h2>All Movies</h2>
                        <SearchForm query={query} isLoading={this.state.isLoading} />
                    </div>
                    <div className="filters">
                        <Filter
                            label="Order by"
                            filterType="orderBy"
                            currentFilter={this.state.orderBy} 
                            options={orderBys}
                            placeholder="Default"
                            onChange={this.handleOrderByChange}
                            clearable={false}
                        />
                        <Filter
                            label="Filter by"
                            filterType="filterBy"
                            currentFilter={this.state.filterBy} 
                            options={genreStore.selectList('name')}
                            placeholder="All Genres"
                            onChange={this.handleFilterByChange}
                            clearable={true}
                        />
                    </div>
                    <div className="segment">
                        <Movies movies={this.state.movies} orderBy={this.state.orderBy} ordering={this.state.ordering} />
                    </div>
                </div>
                <div className="loader"></div>
            </div>
        );
    }

}

export default Home;