import React from 'react';
import { Link } from 'react-router';
import HomeActions from '../../actions/home';
import { forEach } from 'lodash';
import s from '../../settings';

class Movie extends React.Component {

    constructor(props) {
        super(props);

        this.maxGenres = 2;
        this.genreIndex = 0;
    }

    componentDidMount() {
        if (this.props.genre_ids.length > 0) {
            this.fetchGenre();
        }
    }

    fetchGenre() {
        if (this.props.genre_ids[this.genreIndex]) {
            let genreId = this.props.genre_ids[this.genreIndex];
            let url = `${s.ENDPOINTS.BASE_GENRE}${genreId}`;

            if (window.GENRES[genreId]) {
                HomeActions.setGenre.defer({
                    movieId: this.props.id,
                    genre: window.GENRES[genreId]
                });
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
                        window.GENRES[response.id] = response; //cache
                        HomeActions.setGenre.defer({
                            movieId: this.props.id,
                            genre: response
                        });


                        this.genreIndex++;
                        if (this.genreIndex < this.maxGenres) {
                            this.fetchGenre();
                        }
                    });
            }
        }
    }

    fetchMovie() {
        let url = `${s.ENDPOINTS.BASE_MOVIE}${this.props.id}`;

        if (window.MOVIES[this.props.id]) {
            HomeActions.setMovie(window.MOVIES[this.props.id]);
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

                }
            })
                .done((response) => {
                    HomeActions.setMovie(response);
                    window.MOVIES[response.id] = response; //cache    
                })
                .always(function() {

                })
                .fail(function() {
                    
                });
        }
    }

    formatGenres() {
        if (this.props.genres) {
            let gs = [];
            
            forEach(this.props.genres, function(genre, index) {
                gs.push(genre.name);
            });

            return gs.join(', ');
        }

        return '';
    }

    render() {
        let poster;
        let voteAvg = this.props.vote_average.toFixed(1);
        let genres = this.formatGenres();

        if (this.props.poster_path) {
            poster = `https://image.tmdb.org/t/p/w${s.IMAGE_WIDTH}${this.props.poster_path}`;
        } else {
            poster = `https://placeholdit.imgix.net/~text?txtcolor=ffffff&bg=000000&txtsize=40&txt=${this.props.title}&w=300&h=428`;
        }

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