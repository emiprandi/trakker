import React from 'react';
import styles from './Timer.css';

const Timer = () => {
  return (
    <section>
      <div>0:00:00</div>
      <div className={styles.start}></div>
      <div className={styles.stop}></div>
    </section>
  );
}

export default Timer;
