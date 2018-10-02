import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import { unregister } from './registerServiceWorker';
import App from './App';

import './index.css';

const hist = createBrowserHistory();
unregister();

ReactDOM.render(
  <Router history={hist}>
    <App/>
  </Router>,
  document.getElementById('root')
);

