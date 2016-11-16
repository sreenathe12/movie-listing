import React from 'react';
import { Link } from 'react-router';
import Circle from '../circle';

class Details extends React.Component {

    //TODO: this function is repeated, no good!
    genres() {
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
        let releaseYear = this.props.release_date.substr(0, 4);
        let endPercentage = ((this.props.vote_average / 10)*100);

        return(
            <div className="movie-details-container">
                <Link to="/" className="back-link">
                    <i className="fa fa-arrow-circle-o-left"></i> Back to list
                </Link>
                <div className="movie-header">
                    <h2 className="movie-title">{this.props.title}<span>({releaseYear})</span></h2>
                    <p className="movie-overview">{this.props.overview}</p>
                </div>
                <div className="movie-info">
                    <div className="movie-vote-average">
                        <Circle value={this.props.vote_average*.1} />
                    </div>
                    <div className="movie-details">
                        <ul>
                            <li>
                                <span className="detail-label">Genre</span>
                                <span className="detail">{this.genres()}</span>
                            </li>
                            <li>
                                <span className="detail-label">Release Date</span>
                                <span className="detail">{this.props.release_date}</span>
                            </li>
                            <li>
                                <span className="detail-label">Duration</span>
                                <span className="detail">{this.props.runtime}min</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default Details;