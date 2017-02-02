import React from 'react';
import styles from './Login.css';

const Login = (props) => {
  return (
    <div>
      <h1>toggl</h1>
      <input type="text" name="authUser" onChange={props.onChange} />
      <input type="password" name="authPass" onChange={props.onChange} />

      <button onClick={props.onLogin}>LOG IN</button>
    </div>
  );
}

export default Login;
