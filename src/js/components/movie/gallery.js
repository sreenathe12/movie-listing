import React from 'react';
import GalleryImage from './gallery-image';

class Gallery extends React.Component {

	render() {
		let images = this.props.images.map((image) => {
			return <GalleryImage key={"gallery-image-"+image.file_path} movieId={this.props.movieId} {...image} />;
		});

		return(
			<div className="movie-gallery">
				{images}
			</div>
		);
	}

}

export default Gallery;