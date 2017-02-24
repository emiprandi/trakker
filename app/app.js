import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';
import Api from './services/api';
import DB from './services/db';

const api = new Api();
const db = new DB();

import Login from './components/Login';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import Timer from './components/Timer';

class App extends React.Component {
  constructor() {
    super();

    const savedToken = db.get('token');
    if (savedToken) {
      api.setToken(savedToken);
    }

    this.state = {
      inputUser: '',
      inputPass: '',
      loginError: false,
      currentTimer: {},
      entries: [],
      projects: db.getJSON('projects') || [],
      section: db.get('section') || 'login'
    };

    this.handlerInputChange = this.handlerInputChange.bind(this);
    this.handlerLoginAction = this.handlerLoginAction.bind(this);
    this.handlerSaveEntry = this.handlerSaveEntry.bind(this);
  }

  /*
   * Methods
   */
  loadDashboard() {
    this.setState({
      section: 'loading'
    }, () => {
      const activeTimer = api.request('/time_entries/current');
      const entries = api.request('/time_entries');

      // get current app status: entries dashboard or active timer
      Promise.all([activeTimer, entries]).then(result => {
        const section = 'app';

        result[1].sort((a, b) => new Date(b.start) - new Date(a.start));
        const entries = result[1].filter((entry) => entry.stop);

        db.set('section', section);
        this.setState({
          currentTimer: result[0].data || {},
          section: section,
          entries: entries
        });
      });

      // updates projects (will be used later...)
      api.request('/workspaces/' + db.get('wid') + '/projects').then(projects => {
        db.setJSON('projects', projects);
        this.setState({
          projects: projects
        });
      });
    });
  }

  /*
   * Common
   */
  handlerInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /*
   * Handlers
   */
  handlerLoginAction() {
    api.login(this.state.inputUser, this.state.inputPass).then(response => {
      db.set('token', response.api_token);
      db.set('wid', response.default_wid);

      this.setState({
        inputUser: '',
        inputPass: '',
        authError: false
      });

      this.loadDashboard();
    }).catch(() => {
      this.setState({
        authError: true
      });
    });
  }

  handlerSaveEntry(newEntry) {
    let entries = this.state.entries;
    entries.unshift(newEntry);

    this.setState({
      entries: entries
    });
  }

  handlerRemote(action) {
    ipcRenderer.send(action);
  }

  /*
   * Render
   */
  componentDidMount() {
    if (this.state.section === 'app') {
      this.loadDashboard();
    }
  }

  render() {
    let view;

    // State-of-the-art router hehe
    if (this.state.section === 'login') {
      view = <Login onLogin={this.handlerLoginAction} onInputChange={this.handlerInputChange} authError={this.state.authError} />;
    } else if (this.state.section === 'loading') {
      view = <Loading />;
    } else if (this.state.section === 'app') {
      view = <div>
        <Dashboard entries={this.state.entries} projects={this.state.projects} />
        <Timer current={this.state.currentTimer} onSave={this.handlerSaveEntry} remote={this.handlerRemote} />
      </div>;
    }

    return <div className="appContainer">{view}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
