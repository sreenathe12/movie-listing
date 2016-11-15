import React from 'react';
import Select from 'react-select';
import HomeActions from '../../actions/home';
import { kebabCase } from 'lodash';

class Filter extends React.Component {

    render() {
        let filterId = kebabCase(this.props.filterType);

        return(
            <div className="filter">
                <label for={filterId}>{this.props.label}:</label>
                <div className="select-container">
                    <Select 
                        name={this.props.filterType}
                        value={this.props.currentFilter}
                        options={this.props.options}
                        clearable={this.props.clearable}
                        searchable={false}
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </div>
        );
    }

}

export default Filter;