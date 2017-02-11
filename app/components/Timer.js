import React from 'react';
import Time from '../services/time';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer;
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

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  tick() {
    const elapsed = Time.elapsed(this.state.start);

    this.setState({
      timer: {
        seconds: elapsed.seconds,
        minutes: elapsed.minutes,
        hours: elapsed.hours
      }
    });
  }

  startTimer() {
    this.setState({
      start: Date.now()
    }, () => {
      this.timer = setInterval(() => this.tick(), 1000);
    });
  }

  stopTimer() {
    // save time entry...
    clearInterval(this.timer);
    this.setState({
      start: null,
      timer: {
        seconds: '00',
        minutes: '00',
        hours: '0'
      }
    });
  }

  render() {
    return <div>
      <div>{this.state.timer.hours}:{this.state.timer.minutes}:{this.state.timer.seconds}</div>
      <button onClick={this.state.start === null ? this.startTimer : this.stopTimer}>Action</button>
    </div>;
  }
}

export default Timer;
