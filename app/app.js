import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';
import Api from './services/api';

const api = new Api();

import Login from './components/Login';
import Dashboard from './components/Dashboard';

const db = localStorage;

class App extends React.Component {
  constructor() {
    super();

    let state;
    const defaultState = {
      authToken: '',
      authUser: '',
      authPass: '',
      me: {},
      entries: []
    };
    const storageState = db.getItem('state');

    if (storageState) {
      state = JSON.parse(storageState);
      api.setToken(state.authToken);
    } else {
      state = defaultState;
    }
    this.state = state;

    // login
    this.handlerLoginInputs = this.handlerLoginInputs.bind(this);
    this.handlerLoginAction = this.handlerLoginAction.bind(this);
  }

  /*
   * Helpers
   */
  persistState() {
    db.setItem('state', JSON.stringify(this.state));
  }

  loadEntries() {
    api.request('/time_entries').then((entries) => {
      this.setState({
        entries: entries
      }, this.persistState);
    });
  }

  /*
   * Login
   */
  handlerLoginInputs(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({
      [field]: value
    });
  }

  handlerLoginAction() {
    api.login(this.state.authUser, this.state.authPass).then((response) => {
      this.setState({
        authToken: response.api_token,
        authUser: '',
        authPass: '',
        me: response
      }, this.persistState);

      this.loadEntries();
    });
  }

  /*
   * Dashboard
   */
  handlerClose() {
    ipcRenderer.send('close-app');
  }


  /*
   * Render
   */
  componentDidMount() {
    if (this.state.authToken !== '') {
      this.loadEntries();
    }
  }

  render() {
    let view = <Login onLogin={this.handlerLoginAction} onChange={this.handlerLoginInputs} />;

    if (this.state.authToken !== '') {
      view = <Dashboard name={this.state.me.fullname} />;
    }

    return (
      <div className="appContainer">{view}</div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
