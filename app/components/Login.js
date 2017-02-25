import React from 'react';

import commonStyles from '../styles/Common.css';
import formStyles from '../styles/Forms.css';

import background from '../img/login-background.png';
import logo from '../img/toggl-logo.png';

const Login = props =>
  <div className={commonStyles.section} style={{backgroundImage: `url(${background})`}}>
    <img className={commonStyles.logo} src={logo} height="30" />

    <p className={formStyles.error}>{props.authError ? 'Invalid credentials' : ''}</p>

    <input className={formStyles.input} type="text" name="inputUser" onChange={props.onInputChange} />
    <input className={formStyles.input} type="password" name="inputPass" onChange={props.onInputChange} />

    <button className={formStyles.button} onClick={props.onLogin}>LOG IN</button>
  </div>;

export default Login;
