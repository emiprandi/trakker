export const elapsed = (start, end = Date.now()) => {
  if (typeof start !== 'number') {
    start = Date.parse(start);
  }
  if (typeof end !== 'number') {
    end = Date.parse(end);
  }

  let elapsed = (end - start) / 1000;

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

export default {
  elapsed
}
