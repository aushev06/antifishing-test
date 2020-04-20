import React from 'react';
import ReactDOM from 'react-dom';
import {AppProvider} from './provider'
import {BrowserRouter as Router} from 'react-router-dom';
import Main from "./main";



ReactDOM.render(
    <AppProvider>
        <Router>
            <Main/>
        </Router>
    </AppProvider>
    ,
    document.getElementById('root')
);