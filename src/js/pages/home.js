import React from 'react';
import SearchForm from '../components/search-form';
import HomeActions from '../actions/home';
import HomeStore from '../stores/home';
import Movies from '../components/home/movies';
import Filter from '../components/home/filter';
import s from '../settings';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = HomeStore.getState();
    }

    componentDidMount() {
        HomeStore.listen(this._onChange.bind(this));
        this.fetchMovies();
    }

    componentWillUnMount() {
        HomeStore.unlisten(this._onChange.bind(this));
    }

    _onChange(state) {
        this.setState(state);
    }

    fetchMovies() {
        $.ajax({
            url: s.ENDPOINTS.NOW_PLAYING,
            type: 'get',
            data: {
                api_key: s.API_KEY,
                page: this.state.page
            },
            beforeSend: function() {
                HomeActions.setLoadingState(true);
            }
        })
            .done((response) => {
                HomeActions.loadMovies(response.results);               
            })
            .always(function() {
                HomeActions.setLoadingState(false);
            })
            .fail(function() {
                alert('fail');
            });
    }

    render() {
        let isLoading = this.state.isLoading ? 'loading' : 'dormant';

        return(
            <div className={"home page "+isLoading}>
                <div className="container">
                    <div className="heading">
                        <h2>All Movies</h2>
                        <SearchForm />
                    </div>
                    <div className="filters">
                        <Filter label="Order by" options={this.state.sortBys} />
                    </div>
                    <div className="segment">
                        <Movies movies={this.state.movies} />
                    </div>
                </div>
                <div className="loader"></div>
            </div>
        );
    }

}

export default Home;