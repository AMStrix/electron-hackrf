import React from 'react';

export default class App extends React.Component {
    state = {
        radio: null
    };
    componentDidMount() {
        let radioObserver = x => console.log('x', x) || this.setState({radio: x.radio});
        window.state.observe(radioObserver);
    }
    render() {
        if (this.state.radio) {
            return (<div>
                <div>hackrf connected: {this.state.radio.isConnected ? 'true' : 'false'}</div>
                <div>hackrf version: {this.state.radio.version}</div>
            </div>);
        } else {
            return null;
        }
    }
}