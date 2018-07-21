import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import FullPage from './components/fullpage';
import Login from './components/login';
import Signup from './components/signup';
import Track from './components/track';
import Markdown from "./components/markdown";

export default class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={FullPage}> </Route>
                    <Route exact path="/signup" component={Signup}> </Route>
                    <Route exact path="/login" component={Login}> </Route>
                    <Route exact path="/track" component={Track}> </Route>
                    <Route exact path="/gymfinder"> </Route>
                    <Route exact path="/markdown" component={Markdown}> </Route>
                </Switch>
            </div>
        );
    }
}
