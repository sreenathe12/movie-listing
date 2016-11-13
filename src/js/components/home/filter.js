import React from 'react';
import HomeActions from '../../actions/home';
import FilterItem from './filter-item';

class Filter extends React.Component {

    handleClick(evt) {
        evt.preventDefault();
        HomeActions.toggleFilterState(this.props.filterType);
    }

    render() {
        let { filter } = this.props;
        let filterOpen = filter.open ? 'open' : 'closed';
        let current;

        let filterOptions = this.props.options.map((option) => {
            if (option.key == filter.selected) {
                current = option;
            } else {
                return <FilterItem key={"f-"+option.key} id={option.key} title={option.title} filterType={this.props.filterType} />;
            }
        });

        return(
            <div className="filter-option">
                <div className="label">{this.props.label}:</div>
                <div className={"filter "+filterOpen}>
                    <a href="#" className="placeholder" onClick={this.handleClick.bind(this)}>
                        <span>{current.title}</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="filter-options">
                        {filterOptions}
                    </ul>
                </div>
            </div>
        );
    }

}

export default Filter;