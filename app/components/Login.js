import React from 'react';
import styles from './Login.css';

const Login = props =>
  <div>
    <h1>toggl</h1>
    <input type="text" name="inputUser" onChange={props.onInputChange} />
    <input type="password" name="inputPass" onChange={props.onInputChange} />

    <button onClick={props.onLogin}>LOG IN</button>

    <p>{props.authError ? 'Login error' : ''}</p>
  </div>;

export default Login;
