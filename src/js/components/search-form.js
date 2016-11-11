import React from 'react';

class SearchForm extends React.Component {

    render() {
        return(
            <div className="search">
                <form>
                    <div className="icon"><i className="fa fa-search fa-lg"></i></div>
                    <input type="text" name="q" placeholder="Search for movies" className="dark-input icon-input" />
                </form>
            </div>
        );
    }

}

export default SearchForm;