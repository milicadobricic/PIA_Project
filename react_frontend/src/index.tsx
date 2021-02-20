import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {Switch} from "react-router";
import * as serviceWorker from './serviceWorker';
import App from "./App";
import HomePage from "./components/home/HomePage";
import NotFound from "./components/general/NotFound";
import PrivateRoute from "./components/general/PrivateRoute";
import RegisterPage from "./components/register/RegisterPage";
import CurrentUserProfilePage from "./components/profile/CurrentUserProfilePage";

const generalRoutes: Array<{path: string, component: any}> = [
    {path: '/', component: HomePage},
    {path: '/register', component: RegisterPage},
    {path: '/not-found', component: NotFound},
]

const loggedInRoutes: Array<{path: string, component: any}> = [
    {path: '/profile', component: CurrentUserProfilePage},
]

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                {
                    generalRoutes.map(route => <Route exact path={route.path} component={route.component}/>)
                }
                {
                    loggedInRoutes.map(route => <Route exact path={route.path} render={(props) =>
                        <PrivateRoute roles={["student", "employee", "admin"]}>
                            {React.createElement(route.component, props)}
                        </PrivateRoute>
                    }/>)
                }
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
