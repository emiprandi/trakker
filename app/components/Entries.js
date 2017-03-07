import React from 'react';
import Time from '../services/time';

import entriesStyles from '../styles/Entries.css';

const Entries = props =>
  <ul className={entriesStyles.entries}>
    {props.entries.length === 0 ? (
      <li>No entries to show.</li>
    ) : props.entries.map(entry =>
      <li key={entry.id}>
        <i className={entriesStyles.projectColor} style={{backgroundColor: entry.projectColor}}></i>
        <div className={entriesStyles.entryDescription}>
          <span>{entry.projectName || 'Unknown Project'}</span>
          <span>{entry.description}</span>
        </div>
        <div className={entriesStyles.entryTime}>
          <span>-</span>
          <span>{new Time(entry.start, entry.stop).elapsedForHumans()}</span>
        </div>
      </li>
    )}
  </ul>;

export default Entries;
