import React from 'react';
import s from '../../settings';

class GalleryImage extends React.Component {

	render() {
		let thumb = `https://image.tmdb.org/t/p/w${s.IMAGE_WIDTH}${this.props.file_path}`;
		let full = `https://image.tmdb.org/t/p/w1000${this.props.file_path}`;

		return(
			<a href={full} data-rel={"lightcase:"+this.props.movieId} className="gallery-image">
				<img src={thumb} />
			</a>
		);
	}

}

export default GalleryImage;