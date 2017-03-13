import React from 'react';

import commonStyles from '../styles/Common.css';
import spinnerStyles from '../styles/Spinner.css';

import background from '../img/login-background.png';
import logo from '../img/trakker-logo.png';

const Loading = props =>
  <div className={commonStyles.section} style={{backgroundImage: `url(${background})`}}>
    <img className={commonStyles.logo} src={logo} />
    <div className={spinnerStyles.spinner} />
  </div>;

export default Loading;
