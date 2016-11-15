import React from 'react';
import MovieStore from '../stores/movie';
import MovieActions from '../actions/movie';
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

    componentWillUnMount() {
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
                .always(function() {
                    MovieActions.setLoadingState(false);
                });
        }
    }

	render() {
		let isLoading = this.state.isLoading ? 'loading' : 'dormant';
        let movieId = this.state.movie ? this.state.movie.id : '';
        let backdrops = this.state.movie ? this.state.movie.images.backdrops : [];

		return(
			<div className={"movie page "+isLoading}>
                <div className="container">
				    <Gallery movieId={movieId} images={backdrops} />
                </div>
				<div className="loader"></div>
			</div>
		);
	}

}

export default Movie;