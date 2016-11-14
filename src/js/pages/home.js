import React from 'react';
import SearchForm from '../components/search-form';
import HomeActions from '../actions/home';
import HomeStore from '../stores/home';
import Movies from '../components/home/movies';
import Filter from '../components/home/filter';
import { cloneDeep, now } from 'lodash';
import s from '../settings';

const orderBys = cloneDeep(s.SORTABLES);

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = HomeStore.getState();
    }

    componentDidMount() {
        HomeStore.listen(this._onChange.bind(this));
        this.fetchMovies(this.state.page);
        $(window).scroll(this.watch.bind(this));
    }

    componentWillUnMount() {
        HomeStore.unlisten(this._onChange.bind(this));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.page != nextState.page) {
            return false;
        }
        if (this.state.isAppending != nextState.isAppending) {
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
        
        if (!this.state.isAppending && !window.LOADED_PAGES[this.state.page]) {
            if (((docHeight - winHeight) - scrollTop) < 1000) {
                this.fetchMovies(this.state.page, true);
            }
        }
        
    }

    fetchMovies(page = 1, append = false) {
        console.log('Loading page '+page);
        $.ajax({
            url: s.ENDPOINTS.POPULAR,
            type: 'get',
            dataType: 'jsonp',
            data: {
                api_key: s.API_KEY,
                page: page
            },
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
                HomeActions.nextPage.defer();

                window.LOADED_PAGES[page] = now();
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

    render() {
        let isLoading = this.state.isLoading ? 'loading' : 'dormant';

        return(
            <div className={"home page "+isLoading}>
                <div className="container">
                    <div className="heading">
                        <h2>All Movies</h2>
                        <SearchForm query={this.state.query} isLoading={this.state.isLoading} />
                    </div>
                    <div className="filters">
                        <Filter label="Order by" filterType="orderBy" currentFilter={this.state.orderBy} options={orderBys} />
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