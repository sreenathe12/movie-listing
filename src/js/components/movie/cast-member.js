import React from 'react';

class CastMember extends React.Component {

	render() {
		let thumbStyle = {
			backgroundImage: `url('https://image.tmdb.org/t/p/w185/${this.props.profile_path}')`
		}

		return(
			<div className="cast-member">
				<div className="thumb cell" style={thumbStyle}></div>
				<div className="actor-name cell">{this.props.name}</div>
				<div className="as cell">As...</div>
				<div className="actor-character cell">{this.props.character}</div>
			</div>
		);
	}

}

export default CastMember;