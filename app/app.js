import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';

import Header from './components/Header';
import Timer from './components/Timer';

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
        <Header></Header>
        <Timer></Timer>
        <button onClick={this._closeHandler}>Close</button>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
