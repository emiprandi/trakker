import React from 'react';

const Dashboard = props =>
  <ul>
    {props.entries.map((entry) => <li key={entry.id}>{entry.description}</li>)}
  </ul>;

export default Dashboard;
