import React from 'react';
import { Link } from 'react-router';

class Problem extends React.Component {

    render() {
        return(
            <div className="problem page">
                <div className="content">
                    <div className="error-block">
                        <h2 className="oops"><i className="fa fa-frown-o"></i> Uh oh, something went wrong</h2>
                        <p>Please <Link to="/">click here</Link> to return home</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Problem;