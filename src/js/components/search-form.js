import React from 'react';
import { Link, browserHistory } from 'react-router';
import HomeActions from '../actions/home';
import s from '../settings';

class SearchForm extends React.Component {

    handleSubmit(evt) {
        evt.preventDefault();
        let $form = $(evt.currentTarget);
        browserHistory.push(`/?${$form.serialize()}`);
    }
    
    render() {
        let showX = this.props.query.length > 0 ? 'focused' : 'unfocused';

        return(
            <div className={"search "+showX}>
                <form action="/" method="get" onSubmit={this.handleSubmit.bind(this)}>
                    <Link to="/" className="clear" title="Clear Search">
                        <i className="fa fa-times"></i>
                    </Link>
                    <div className="icon"><i className="fa fa-search fa-lg"></i></div>
                    <input type="text" id="q" name="q" defaultValue={this.props.query} placeholder="Search for movies" className="dark-input icon-input" disabled={this.props.isLoading} />
                    <input type="hidden" name="page" value="1" />
                </form>
            </div>
        );
    }

}

export default SearchForm;  