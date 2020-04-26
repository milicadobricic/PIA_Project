import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {Switch} from "react-router";
import * as serviceWorker from './serviceWorker';
import App from "./App";
import HomePage from "./generalComponents/HomePage";
import NotFound from "./generalComponents/NotFound";

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/not_found" component={NotFound}/>
                <Route render={() => <Redirect to={"/not_found"}/>}/>
            </Switch>
        </App>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
