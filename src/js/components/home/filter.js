import React from 'react';
import HomeActions from '../../actions/home';
import FilterItem from './filter-item';
import { kebabCase } from 'lodash';

class Filter extends React.Component {

    handleChange(evt) {
        HomeActions.selectFilter({
            filterType: this.props.filterType,
            selected: evt.currentTarget.value
        });
    }

    render() {
        let filterId = kebabCase(this.props.label);
        let options = this.props.options.map((option) => {
            return <FilterItem currentFilter={this.props.filter.selected} key={"filter-item-"+option.key} title={option.title} id={option.key} />;
        });

        return(
            <div className="filter">
                <label for={filterId}>{this.props.label}:</label>
                <select id={filterId} name={this.props.filterType} onChange={this.handleChange.bind(this)}>
                    {options}
                </select>
            </div>
        );
    }

}

export default Filter;