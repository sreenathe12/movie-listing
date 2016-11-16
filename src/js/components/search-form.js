import React from 'react';
import { Link, hashHistory } from 'react-router';
import HomeActions from '../actions/home';
import s from '../settings';

class SearchForm extends React.Component {

    handleSubmit(evt) {
        evt.preventDefault();
        let $form = $(evt.currentTarget);

        hashHistory.push(`?${$form.serialize()}`);
    }

    handleClick(evt) {
        //not sure I like this
        document.getElementById('q').value = '';
    }
    
    render() {
        let showX = this.props.query.length > 0 ? 'focused' : 'unfocused';

        return(
            <div className={"search "+showX}>
                <form action="/" method="get" onSubmit={this.handleSubmit.bind(this)}>
                    <Link to="/" className="clear" title="Clear Search" onClick={this.handleClick}>
                        <i className="fa fa-times"></i>
                    </Link>
                    <div className="icon"><i className="fa fa-search fa-lg"></i></div>
                    <input type="text" id="q" name="q" defaultValue={this.props.query} placeholder="Search for movies" className="dark-input icon-input" disabled={this.props.isLoading} />
                </form>
            </div>
        );
    }

}

export default SearchForm;  