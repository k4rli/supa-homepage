import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import FullPage from './components/fullpage';
import Login from './components/login';
import Signup from './components/signup';
import Track from './components/track';
import Markdown from './components/markdown';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={FullPage} />
                    <Route path="/track" component={Track} />
                    <Route exact path="/gymfinder" />
                    <Route exact path="/markdown" component={Markdown} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
