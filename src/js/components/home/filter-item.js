import React from 'react';
import HomeActions from '../../actions/home';

class FilterItem extends React.Component {

    render() {
        let selected = this.props.currentFilter == this.props.id ? true : false;
        return(
            <option value={this.props.id} selected={selected}>
                {this.props.title}
            </option>
        );
    }

}

export default FilterItem;