const Time = class {
  constructor(start, end = Date.now()) {
    this.start = typeof start !== 'number' ? Date.parse(start) : start;
    this.end = typeof end !== 'number' ? Date.parse(end) : end;
  }

  elapsed() {
    let elapsed = (this.end - this.start) / 1000;

    const seconds = Math.round(elapsed % 60);

    elapsed = Math.floor(elapsed / 60);
    const minutes = Math.round(elapsed % 60);

    elapsed = Math.floor(elapsed / 60);
    const hours = Math.round(elapsed % 24);

    return {
      seconds: (seconds < 10 ? '0' : '') + seconds,
      minutes: (minutes < 10 ? '0' : '') + minutes,
      hours: hours.toString()
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

export default Time
