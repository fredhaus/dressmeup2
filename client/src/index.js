import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';



document.getElementById('root').innerText = 'Charging Up ...'

// makes sure the entire App only gets rendered AFTER we know if the user is logged in
axios.get('/api/auth/checkuser').then(res => {
  ReactDOM.render(
    <BrowserRouter>
      <App user={res.data.userDoc} />
      

    </BrowserRouter>
    , document.getElementById('root'));
}).catch(err => {
  alert('backend not running or /checkuser route not defined !')
})



serviceWorker.unregister();