import React from 'react';
import NavBar from './navbar';

class Layout extends React.Component {

    render() {
        return(
            <div className="site">
                <NavBar />
                
                {this.props.children}
            </div>
        );
    }

}

export default Layout;