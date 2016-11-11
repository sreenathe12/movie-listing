import React from 'react';
import FilterItem from './filter-item';

class Filter extends React.Component {

    render() {
        let current = this.props.options.find((option) => {
            return option.selected === true;
        });
        let filterOptions = this.props.options.map((option) => {
            if (option.key != current.key) {
                return <FilterItem key={"f-"+option.key} id={option.key} title={option.title} />;
            }
        });

        return(
            <div className="filter">
                <div className="label">{this.props.label}:</div>
                <div className="dropdown">
                    <div className="placeholder">
                        <span>{current.title}</span>
                        <i className="fa fa-caret-down"></i>
                        <div className="filter-options">
                            <ul>{filterOptions}</ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Filter;