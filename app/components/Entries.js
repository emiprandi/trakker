import React from 'react';
import Time from '../services/time';

import entriesStyles from '../styles/Entries.css';
//import timerStyles from '../styles/Timer.css';

const Dashboard = props =>
  <ul className={entriesStyles.entries}>
    {props.entries.map((entry) =>
      <li key={entry.id}>
        <i className={entriesStyles.projectColor}></i>
        <div className={entriesStyles.entryDescription}>
          <span>Project</span>
          <span>{entry.description}</span>
        </div>
        <div className={entriesStyles.entryTime}>
          <span>-</span>
          <span>{new Time(entry.start, entry.stop).elapsedForHumans()}</span>
        </div>
      </li>
    )}
  </ul>;

export default Dashboard;
