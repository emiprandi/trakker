import React from 'react';
import styles from '../styles/Login.css';

import background from '../img/login-background.png';
import logo from '../img/toggl-logo.png';

const Login = props =>
  <div className={styles.section} style={{backgroundImage: `url(${background})`}}>
    <img className={styles.logo} src={logo} height="30" />

    <p className={styles.error}>{props.authError ? 'Invalid credentials' : ''}</p>

    <input className={styles.input} type="text" name="inputUser" onChange={props.onInputChange} />
    <input className={styles.input} type="password" name="inputPass" onChange={props.onInputChange} />

    <button className={styles.button} onClick={props.onLogin}>LOG IN</button>
  </div>;

export default Login;
