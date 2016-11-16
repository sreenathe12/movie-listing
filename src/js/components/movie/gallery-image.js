import React from 'react';
import s from '../../settings';

class GalleryImage extends React.Component {

	render() {
        let fullWidth = 1000;
        let imgWidth = this.props.imgWidth > 100 ? 100 : this.props.imgWidth;//quick and dirty fix
        let width = `${imgWidth}%`;
		let height = (s.IMAGE_WIDTH / 2) / this.props.aspect_ratio;
		let full = `https://image.tmdb.org/t/p/w${fullWidth}${this.props.file_path}`;

        let style = {
            backgroundImage: `url('https://image.tmdb.org/t/p/w${s.IMAGE_WIDTH}${this.props.file_path}')`,
            width: width,
            height: `${height}px`
        }

		return(
			<a href={full} style={style} data-rel={"lightcase:"+this.props.movieId} className="gallery-image fg">
			</a>
		);
	}

}

export default GalleryImage;