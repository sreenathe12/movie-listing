import React from 'react';
import { Link, hashHistory } from 'react-router';
import MovieStore from '../stores/movie';
import MovieActions from '../actions/movie';
import Details from '../components/movie/details';
import Gallery from '../components/movie/gallery';
import s from '../settings';

class Movie extends React.Component {

	constructor(props) {
        super(props);
        this.state = MovieStore.getState();
    }

    componentDidMount() {
        MovieStore.listen(this._onChange.bind(this));
        this.fetchMovie();
    }

    componentWillUnmount() {
        MovieStore.unlisten(this._onChange.bind(this));
    }

    _onChange(state) {
        this.setState(state);
    }

    fetchMovie() {
        let { params } = this.props;
        let url = `${s.ENDPOINTS.BASE_MOVIE}${params.movieId}`;

        if (moviesStore.get(params.movieId)) {
            MovieActions.loadMovie(moviesStore.get(params.movieId));
        } else {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp',
                data: {
                    api_key: s.API_KEY,
                    append_to_response: 'images,credits'
                },
                beforeSend: function() {
                    MovieActions.setLoadingState(true);
                }
            })
                .done(function(response) {
                    MovieActions.loadMovie(response);
                    moviesStore.save(response);
                })
                .always(() => {
                    MovieActions.setLoadingState(false);
                })
                .fail((jqXhr, status) => {
                    hashHistory.push('problem');
                });
        }
    }

	render() {
        let { movie } = this.state;
        let isLoading, details, gallery;

        if (movie) {
            isLoading = movie.isLoading ? 'loading' : 'dormant';
            details = <Details {...movie} />;
            gallery = <Gallery movieId={movie.id} images={movie.images.backdrops} />;
        }

		return(
			<div className={"single-movie page "+isLoading}>
                <div className="container">
                    <div className="frame">
                        {gallery}    
                        {details}
                    </div> 
                </div>
				<div className="loader"></div>
			</div>
		);
	}

}

export default Movie;