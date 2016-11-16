import React from 'react';
import ReactDOM from 'react-dom';

class Circle extends React.Component {

    constructor(props) {
        super(props);
        this.bar = null;
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.init();
    }

    init() {
        if (!this.bar) {
            this.bar = new ProgressBar.Circle(ReactDOM.findDOMNode(this), {
                color: '#fff',
                strokeWidth: 8,
                trailColor: '#2a2a2a',
                trailWidth: 8,
                easing: 'bounce',
                duration: 2500,
                text: {
                    autoStyleContainer: false
                },
                from: { color: '#2a2a2a', width: 8 },
                to: { color: '#f9e735', width: 8 },
                step: function(state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);

                    var value = (circle.value()*10).toFixed(1);

                    if (value == 0) {
                        circle.setText('');
                    } else {
                        circle.setText(value);
                    }
                }
            });
            this.bar.text.style.fontFamily = "'Open Sans', sans-serif";
            this.bar.text.style.fontSize = '3.5rem';
            this.bar.text.style.fontWeight = '800';
        }
        this.bar.animate(this.props.value);
    }

    render() {
        return(
            <div className="circle"></div>
        );
    }

}

export default Circle;