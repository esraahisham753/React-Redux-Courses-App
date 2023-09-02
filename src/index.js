import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from './components/App';
import configStore from './redux/configStore';
import {Provider as ReduxProvider} from 'react-redux';

const store = configStore();

render(
    <Router>
        <ReduxProvider store={store} >
            <App />
        </ReduxProvider>
    </Router>, 
    document.getElementById("app"));