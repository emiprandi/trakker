import React from 'react';
import {ipcRenderer} from 'electron';
import Time from '../services/time';

import timerStyles from '../styles/Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer;
    this.timerInterval;
    this.debounceTimer;
    this.state = {
      id: this.props.current.start ? this.props.current.id : 0,
      start: this.props.current.start || null,
      timer: {
        seconds: '00',
        minutes: '00',
        hours: '0'
      },
      description: this.props.current.start ? this.props.current.description : '',
      project: this.props.current.start ? this.props.current.pid : 0
    };

    this.handlerStartTimer = this.handlerStartTimer.bind(this);
    this.handlerStopTimer = this.handlerStopTimer.bind(this);
    this.handlerDescriptionChange = this.handlerDescriptionChange.bind(this);
  }

  tick() {
    this.setState({
      timer: this.timer.elapsed()
    });
  }

  startTimer(date) {
    this.handlerRemote('timer-on');

    const started = Date.parse(date);
    this.timer = new Time(started);

    this.setState({
      start: started
    }, () => {
      this.tick();
      this.timerInterval = setInterval(() => this.tick(), 1000);
    });
  }

  handlerStartTimer() {
    this.props.api.request('/time_entries/start', {
      method: 'POST',
      body: JSON.stringify({
        time_entry: {
          wid: parseInt(this.props.wid),
          created_with: 'github.com/emiprandi/toggl'
        }
      })
    }).then(response => {
      this.startTimer(response.data.start);
      this.setState({
        id: response.data.id
      });
    });
  }

  handlerStopTimer() {
    this.props.api.request(`/time_entries/${this.state.id}/stop`, {
      method: 'PUT'
    }).then(response => {
      this.handlerRemote('timer-off');

      this.props.onSave(response.data);

      clearInterval(this.timerInterval);
      this.setState({
        id: 0,
        start: null,
        timer: {
          seconds: '00',
          minutes: '00',
          hours: '0'
        },
        description: '',
        project: 0
      });
    });
  }

  debounce(callback) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(callback, 250);
  }

  handlerDescriptionChange(e) {
    this.setState({
      description: e.target.value
    }, () => {
      this.debounce(() => {
        this.props.api.request(`/time_entries/${this.state.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            time_entry: {
              description: this.state.description
            }
          })
        });
      });
    });
  }

  handlerRemote(action) {
    ipcRenderer.send(action);
  }

  componentDidMount() {
    if (this.props.current.start) {
      this.startTimer(this.props.current.start);
    }
  }

  render() {
    let stopped = this.state.start === null;

    return <div className={timerStyles.timer + ' ' + (stopped ? timerStyles.timerDefault : timerStyles.timerActive)}>
      <div className={timerStyles.clock}>
        <div className={timerStyles.elapsed}>
          <span
            className={this.state.timer.hours !== '0' ? timerStyles.highlighted : null}
          >{this.state.timer.hours}</span>
          :
          <span
            className={
              (this.state.timer.hours !== '0' || this.state.timer.minutes !== '00') ? timerStyles.highlighted : null
            }
          >{this.state.timer.minutes}</span>
          :
          <span
            className={
              (this.state.timer.hours !== '0' || this.state.timer.minutes !== '00' ||
                this.state.timer.seconds !== '00') ? timerStyles.highlighted : null
            }
          >{this.state.timer.seconds}</span>
        </div>
        <button className={timerStyles.action} onClick={stopped ? this.handlerStartTimer : this.handlerStopTimer}>
          {stopped ? 'START' : 'STOP'}
        </button>
      </div>
      <div className={timerStyles.task}>
        <i className={timerStyles.projectColor}></i>
        <div className={timerStyles.entryDescription}>
          <span>Task</span>
          <input
            type="text"
            name="description"
            placeholder="What are you working on?"
            onChange={this.handlerDescriptionChange}
            value={this.state.description}
          />
        </div>
      </div>
    </div>;
  }
}

export default Timer;
