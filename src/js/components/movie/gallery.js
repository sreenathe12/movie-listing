import React from 'react';
import ReactDOM from 'react-dom';
import GalleryImage from './gallery-image';
import { chunk, random, forEach } from 'lodash';
import s from '../../settings'; 

class Gallery extends React.Component {

	componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.init();
    }

    init() {
    	let $root = $(ReactDOM.findDOMNode(this));
    	$root.find('.gallery-image').lightcase(); 
    }

	render() {
        let movieId = this.props.movieId;
        let featured = this.props.images.shift();
        let chunkedImgs = chunk(this.props.images, 2);
        let images = [];

        forEach(chunkedImgs, function(imgs, index) {
            let firstImgWidth = random(32, 67);
            let secondImgWidth = 100 - firstImgWidth;
            let single = imgs.length == 1 ? true : false;

            let row = imgs.map((image, index) => {
                let imgWidth = index == 0 ? firstImgWidth : secondImgWidth;

                //if only a single image we want it to be 100%
                if (single) {
                    imgWidth = 100;
                }

                return <GalleryImage key={"gallery-image-"+image.file_path} movieId={movieId} {...image} imgWidth={imgWidth} />;
            });

            images.push(row);
        });


		return(
			<div className="gallery">
                <div className="gallery-featured">
                    <a href={`https://image.tmdb.org/t/p/w${s.IMAGE_WIDTH}${featured.file_path}`} className="gallery-image" data-rel={"lightcase:"+movieId}   >
                        <img src={`https://image.tmdb.org/t/p/w${s.IMAGE_WIDTH}${featured.file_path}`} />
                    </a>
                </div>
                <div className="fixed-gallery">
                    {images}
                </div>
			</div>
		);
	}

}

export default Gallery;