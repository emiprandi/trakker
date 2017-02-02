import React from 'react';
import styles from './Login.css';

const Login = (props) => {
  return (
    <div>
      <h1>toggl</h1>
      <input type="text" onChange={props.onUserChange} />
      <input type="password" onChange={props.onPassChange} />

      <button onClick={props.onLogin}>LOG IN</button>
    </div>
  );
}

export default Login;
