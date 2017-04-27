import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../semantic/dist/semantic.css';
import moment from 'moment'

moment.locale('fr');

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

