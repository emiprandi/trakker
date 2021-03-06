export default class Time {
  constructor(start, end) {
    this.start = typeof start !== 'number' ? Date.parse(start) : start;
    this.end = end ? (typeof end !== 'number' ? Date.parse(end) : end) : null;
    this.millisecondsDiff = end ? (this.end - this.start) : null;
  }

  getMilliseconds() {
    return this.millisecondsDiff || (Date.now() - this.start);
  }

  getSeconds() {
    return Math.floor(this.getMilliseconds() % 60000 / 1000);
  }

  getMinutes() {
    return Math.floor(this.getMilliseconds() % 36e5 / 60000);
  }

  getHours() {
    return Math.floor(this.getMilliseconds() / 36e5);
  }

  elapsed() {
    const seconds = this.getSeconds();
    const minutes = this.getMinutes();

    return {
      milliseconds: this.getMilliseconds(),
      seconds: (seconds < 10 ? '0' : '') + seconds,
      minutes: (minutes < 10 ? '0' : '') + minutes,
      hours: this.getHours().toString()
    };
  }

  elapsedForHumans() {
    let result = [];
    let suffix = ' sec';
    const elapsed = this.elapsed();

    result.unshift(elapsed.seconds);

    if (elapsed.minutes !== '00') {
      suffix = ' min';
      result.unshift(elapsed.minutes);
    }
    if (elapsed.hours !== '0') {
      suffix = '';
      result.unshift(elapsed.hours);
    }

    // If there is just one item we only have seconds to show, we parse as int to remove trailing zero
    return result.length === 1 ? parseInt(elapsed.seconds) + suffix : result.join(':') + suffix;
  }
}
