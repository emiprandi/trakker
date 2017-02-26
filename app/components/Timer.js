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

    this.handlerStartTimer = this.handlerStartTimer.bind(this);
    this.handlerStopTimer = this.handlerStopTimer.bind(this);
  }

  tick() {
    const time = new Time(this.state.start);

    this.setState({
      timer: time.elapsed()
    });
  }

  handlerStartTimer(date) {
    this.props.remote('timer-on');
    this.setState({
      start: Date.parse(date) || Date.now()
    }, () => {
      this.tick();
      this.timer = setInterval(() => this.tick(), 1000);
    });
  }

  handlerStopTimer() {
    this.props.remote('timer-off');
    this.props.onSave({
      start: this.state.start,
      stop: Date.now(),
      description: this.state.description,
      project: this.state.project
    });

    clearInterval(this.timer);
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

  componentDidMount() {
    if (this.props.current.start) {
      this.setState({
        description: this.props.current.description,
        project: this.props.current.pid || 0
      });
      this.handlerStartTimer(this.props.current.start);
    }
  }

  render() {
    return <div>
      <div>{this.state.timer.hours}:{this.state.timer.minutes}:{this.state.timer.seconds}</div>
      <button onClick={this.state.start === null ? this.handlerStartTimer : this.handlerStopTimer}>Action</button>
    </div>;
  }
}

export default Timer;
