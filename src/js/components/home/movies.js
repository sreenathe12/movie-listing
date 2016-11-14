import React from 'react';
import FlipMove from 'react-flip-move';
import Movie from './movie';
import { orderBy } from 'lodash';
import s from '../../settings';

class Movies extends React.Component {
    
    render() {
        let movies = this.props.movies.map((movie) => {
            return <Movie key={'movie-'+movie.id} {...movie} />;
        });

        return(
            <FlipMove enterAnimation="fade" staggerDurationBy="30" className="movies">
                {movies}
            </FlipMove>
        );
    }

}

export default Movies;