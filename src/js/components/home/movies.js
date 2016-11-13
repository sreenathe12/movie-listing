import React from 'react';
import FlipMove from 'react-flip-move';
import Movie from './movie';
import { orderBy } from 'lodash';
import s from '../../settings';

class Movies extends React.Component {
    
    render() {
        let ascDesc;

        //lazy, will come back to this
        switch(this.props.orderBy) {
            case 'vote_average':
            case 'popularity':
                ascDesc = 'desc';
                break;
            default:
                ascDesc = 'asc';
        }

        let sortedMovies = orderBy(this.props.movies, [this.props.orderBy], [ascDesc]);
        let movies = sortedMovies.map((movie) => {
            return <Movie key={'movie-'+movie.id} {...movie} />;
        });

        return(
            <FlipMove enterAnimation="fade" staggerDurationBy="50" className="movies">
                {movies}
            </FlipMove>
        );
    }

}

export default Movies;