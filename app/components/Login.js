import React from 'react';

import commonStyles from '../styles/Common.css';
import formStyles from '../styles/Forms.css';

import background from '../img/login-background.png';
import logo from '../img/trakker-logo.png';

const Login = props =>
  <div className={commonStyles.section} style={{backgroundImage: `url(${background})`}}>
    <img className={commonStyles.logo} src={logo} />

    <p className={props.authError ? formStyles.error : formStyles.label}>{props.authError ? 'Invalid credentials' : 'LOGIN WITH YOUR TOGGL ACCOUNT'}</p>

    <input className={formStyles.input} type="text" name="inputUser" onChange={props.onInputChange} />
    <input className={formStyles.input} type="password" name="inputPass" onChange={props.onInputChange} />

    <button className={formStyles.button} onClick={props.onLogin}>LOG IN</button>
  </div>;

export default Login;
