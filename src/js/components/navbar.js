import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {

    render() {
        return(
            <div className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            Movies
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default NavBar;