import React from 'react';
import FlipMove from 'react-flip-move';
import Movie from './movie';
import EmptyResults from '../empty-results';
import { orderBy } from 'lodash';
import s from '../../settings';

class Movies extends React.Component {
    
    render() {
        let movies;

        if (this.props.movies.length > 0) {
            movies = this.props.movies.map((movie) => {
                return <Movie key={'movie-'+movie.id} {...movie} />;
            });

            return(
                <FlipMove 
                    enterAnimation="fade"
                    leaveAnimation="fade" 
                    staggerDurationBy="30" 
                    className="movies"
                >
                    {movies}
                </FlipMove>
            );
        } else {
            return(<EmptyResults>No Movies Found</EmptyResults>);
        }
    }

}

export default Movies;