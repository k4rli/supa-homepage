import React, { Component } from 'react';
import './App.css';
import FullPage from './components/FullPage.js';
import Login from "./components/Login";
import History from "./components/History";
import Signup from "./components/Signup";
import { Route, Router, Switch } from "react-router-dom";
import Track from "./components/Track";
import Markdown from "./components/Markdown";
// import NotFound from "./components/NotFound/NotFound";

export default class App extends Component {
  render() {
    return (
        <div>
            <Router history={History}>
                <Switch>
                    <Route exact path="/" component={FullPage}> </Route>
                    <Route exact path="/signup" component={Signup}> </Route>
                    <Route exact path="/login" component={Login}> </Route>
                    <Route exact path="/track" component={Track}> </Route>
                    <Route exact path="/gymfinder"> </Route>
                    <Route exact path="/markdown" component={Markdown}> </Route>
                </Switch>
            </Router>
        </div>
    );
  }
}
