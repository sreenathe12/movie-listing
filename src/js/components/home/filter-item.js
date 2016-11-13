import React from 'react';
import HomeActions from '../../actions/home';

class FilterItem extends React.Component {

    handleClick(evt) {
        evt.preventDefault();
        
        HomeActions.selectFilter({
            filterType: this.props.filterType,
            selected: this.props.id
        });
    }

    render() {
        return(
            <li className={this.props.css}>
                <a href="#" onClick={this.handleClick.bind(this)}>
                    {this.props.title}
                </a>
            </li>
        );
    }

}

export default FilterItem;