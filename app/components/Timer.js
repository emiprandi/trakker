import React from 'react';
import Time from '../services/time';

import timerStyles from '../styles/Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer;
    this.timerInterval;
    this.state = {
      start: null,
      timer: {
        seconds: '00',
        minutes: '00',
        hours: '0'
      },
      description: '',
      project: 0
    };

    this.handlerStartTimer = this.handlerStartTimer.bind(this);
    this.handlerStopTimer = this.handlerStopTimer.bind(this);
    this.handlerInputChange = this.handlerInputChange.bind(this);
  }

  tick() {
    this.setState({
      timer: this.timer.elapsed()
    });
  }

  startTimer(date) {
    this.props.remote('timer-on');

    const started = date ? Date.parse(date) : Date.now();
    this.timer = new Time(started);

    this.setState({
      start: started
    }, () => {
      this.tick();
      this.timerInterval = setInterval(() => this.tick(), 1000);
    });
  }

  handlerStartTimer() {
    this.startTimer();
  }

  handlerStopTimer() {
    this.props.remote('timer-off');

    this.props.onSave({
      id: 0,
      start: new Date(this.state.start).toISOString(),
      duration: this.timer.elapsed().milliseconds,
      description: this.state.description,
      created_with: 'github.com/emiprandi/toggl'
    });

    clearInterval(this.timerInterval);
    this.setState({
      start: null,
      timer: {
        seconds: '00',
        minutes: '00',
        hours: '0'
      },
      description: '',
      project: 0
    });
  }

  handlerInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    if (this.props.current.start) {
      this.setState({
        description: this.props.current.description,
        project: this.props.current.pid || 0
      });
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
            onChange={this.handlerInputChange}
            value={this.state.description}
          />
        </div>
      </div>
    </div>;
  }
}

export default Timer;
