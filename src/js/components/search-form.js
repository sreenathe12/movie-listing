import React from 'react';
import HomeActions from '../actions/home';
import s from '../settings';

class SearchForm extends React.Component {

    handleSubmit(evt) {
        evt.preventDefault();

        let formData = new FormData(evt.currentTarget);

        this.search(formData.get('query'));
    }

    search(query) {
        $.ajax({
            url: s.ENDPOINTS.SEARCH,
            type: 'get',
            dataType: 'jsonp',
            data: {
                api_key: s.API_KEY,
                query: query
            },
            beforeSend: function() {
                HomeActions.setLoadingState(true);
            }
        })
            .done(function(response) {
                HomeActions.loadMovies(response.results);
            })
            .always(function() {
                HomeActions.setLoadingState.defer(false);
            });
    }

    render() {
        let resultsLoaded = this.props.query.length > 0 ? ' focused' : '';

        return(
            <div className={"search"+resultsLoaded}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="icon"><i className="fa fa-search fa-lg"></i></div>
                    <input type="text" name="query" placeholder="Search for movies" className="dark-input icon-input" disabled={this.props.isLoading} />
                </form>
            </div>
        );
    }

}

export default SearchForm;  