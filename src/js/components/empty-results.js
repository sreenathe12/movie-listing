import React from 'react';

class EmptyResults extends React.Component {

    render() {
        return(
            <h3 className="empty-results">
                {this.props.children}
            </h3>
        );
    }

}

export default EmptyResults;