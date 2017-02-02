import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';

const db = localStorage;

import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor() {
    super();

    const storageState = db.getItem('state');
    this.state = storageState ? JSON.parse(storageState) : {
      auth: {
        user: '',
        pass: '',
        token: '',
        me: {}
      },
      entries: [],
      timer: {
        running: false,
        title: '',
        pid: 0
      }
    };

    // login
    this.handlerLoginUserInput = this.handlerLoginUserInput.bind(this);
    this.handlerLoginPassInput = this.handlerLoginPassInput.bind(this);
    this.handlerLoginAction = this.handlerLoginAction.bind(this);
  }

  // login
  handlerLoginUserInput(e) {
    this.setState({
      auth: Object.assign({}, this.state.auth, {
        user: e.target.value
      })
    });
  }

  handlerLoginPassInput(e) {
    this.setState({
      auth: Object.assign({}, this.state.auth, {
        pass: e.target.value
      })
    });
  }

  handlerLoginAction() {
    console.log(this.state.auth);
  }

  handlerClose() {
    ipcRenderer.send('close-app');
  }

  componentDidMount() {
    if (this.state.auth.token !== '') {
      // ajax call to start the app
    }
  }

  /*
   * Render
   */
  render() {
    let view = <Login onLogin={this.handlerLoginAction} onUserChange={this.handlerLoginUserInput} onPassChange={this.handlerLoginPassInput} />;

    if (this.state.auth.token !== '') {
      view = <Dashboard />;
    }

    return (
      <div className="appContainer">{view}</div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
