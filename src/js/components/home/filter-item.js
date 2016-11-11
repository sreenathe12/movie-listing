import React from 'react';
import HomeActions from '../../actions/home';

class FilterItem extends React.Component {

    handleClick(evt) {
        evt.preventDefault();
        console.log(this.props.id);
    }

    render() {
        return(
            <li className={this.props.css} onClick={this.handleClick.bind(this)}>
                {this.props.title}
            </li>
        );
    }

}

export default FilterItem;