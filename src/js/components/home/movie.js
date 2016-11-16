import React from 'react';
import { Link } from 'react-router';
import HomeActions from '../../actions/home';
import { forEach } from 'lodash';
import s from '../../settings';

class Movie extends React.Component {

    componentDidMount() {
        if (this.props.genre_ids.length > 0) {
            this.fetchGenres(0);
        }
    }

    fetchGenres(genreIndex) {
        let genreId = this.props.genre_ids[genreIndex];
        let url = `${s.ENDPOINTS.BASE_GENRE}${genreId}`;

        if (genreStore.get(genreId)) {            
            HomeActions.setGenre.defer({
                movieId: this.props.id,
                genre: genreStore.get(genreId)
            });

            if (genreIndex < (this.props.genre_ids.length - 1)) {
                this.fetchGenres(genreIndex+1);
            }
        } else {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp',
                data: {
                    api_key: s.API_KEY
                }
            })
                .done((response) => {
                    genreStore.save(response);

                    HomeActions.setGenre.defer({
                        movieId: this.props.id,
                        genre: response
                    });

                    if (genreIndex < (this.props.genre_ids.length - 1)) {
                        this.fetchGenres(genreIndex+1);
                    }
                });
        }
    }

    //only show 2
    formatGenres() {
        let genres = this.props.genres;

        if (genres) {
            if (genres.length == 1) {
                return genres[0].name;
            } else {
                return `${genres[0].name}, ${genres[1].name}`;
            }
        }
        return '';
    }

    render() {
        let poster;
        let voteAvg = this.props.vote_average.toFixed(1);
        let genres = this.formatGenres();

        if (this.props.poster_path) {
            poster = `https://image.tmdb.org/t/p/w${s.IMAGE_POSTER}${this.props.poster_path}`;
        } else {
            poster = `https://placeholdit.imgix.net/~text?txtcolor=ffffff&bg=000000&txtsize=40&txt=${this.props.title}&w=300&h=428`;
        }

        return(
            <div className="movie">
                <div className="poster">
                    <Link to={"/m/"+this.props.id} title={this.props.overview}>
                        <img src={poster} alt={this.props.title} />
                    </Link>
                    <div className="rating">
                        {voteAvg}
                    </div>
                </div>
                <div className="details">
                    <Link to={"/m/"+this.props.id} className="title"  title={this.props.overview}>
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