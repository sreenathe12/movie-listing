import React from 'react';
import { Link } from 'react-router';
import HomeActions from '../../actions/home';
import s from '../../settings';

class Movie extends React.Component {

    componentDidMount() {
        this.fetchMovie();
    }

    fetchMovie() {
        let url = `${s.ENDPOINTS.BASE_MOVIE}${this.props.id}`;

        if (window.MOVIES[this.props.id]) {
            HomeActions.setMovie(window.MOVIES[this.props.id]);
        } else {
            $.ajax({
                url: url,
                type: 'get',
                data: {
                    api_key: s.API_KEY,
                    append_to_response: 'images,credits'
                },
                beforeSend: function() {

                }
            })
                .done((response) => {
                    HomeActions.setMovie(response);
                    //cache
                    window.MOVIES[response.id] = response;         
                })
                .always(function() {

                })
                .fail(function() {
                    alert('fail');
                });
        }
    }

    formatGenres() {
        let genres = [];
        let genreLen = this.props.genres.length;
        let i;

        for (i = 0; i < genreLen; i++) {
            genres.push(this.props.genres[i].name);
        }

        return genres.join(', ');
    }
    
    render() {
        let poster = `https://image.tmdb.org/t/p/w${s.IMAGE_WIDTH}${this.props.poster_path}`;
        let voteAvg = this.props.vote_average.toFixed(1);
        let genres = this.props.genres ? this.formatGenres() : '';

        return(
            <div className="movie">
                <div className="poster">
                    <Link to={"/m/"+this.props.id}>
                        <img src={poster} alt={this.props.title} />
                    </Link>
                    <div className="rating">
                        {voteAvg}
                    </div>
                </div>
                <div className="details">
                    <Link to={"/m/"+this.props.id} className="title">
                        {this.props.title}
                    </Link>
                    <div className="genre">
                        {genres}
                    </div>
                </div>
            </div>
        );
    }

}

export default Movie;