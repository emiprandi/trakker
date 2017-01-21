import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
    this._closeHandler = this._closeHandler.bind(this);
  }

  componentDidMount() {
  }

  _closeHandler() {
    ipcRenderer.send('close-app');
  }

  /*
   * Render
   */
  render() {
    return (
      <div className="appContainer">
        <h1>Hello</h1>
        <button onClick={this._closeHandler}>Close</button>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
