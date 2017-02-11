import React from 'react';
import styles from './Dashboard.css';

const Dashboard = props =>
  <ul>
    {props.entries.map((entry) => <li key={entry.id}>{entry.description}</li>)}
  </ul>;

export default Dashboard;
