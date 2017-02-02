import React from 'react';
import styles from './Dashboard.css';

const Dashboard = (props) => {
  return (
    <div>
      <h1>toggl</h1>
      <span>Dashboard for {props.name}</span>
    </div>

  );
}

export default Dashboard;
