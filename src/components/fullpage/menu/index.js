import React, { Component } from 'react';
import "./style.css";
import NavLink from '../../navlink';

export default class Menu extends Component {
    render() {
        let visibility = "hide";
        if (this.props.menuVisibility) visibility = "show";
        //<h2><NavLink to="/gymfinder">gyms</NavLink></h2>
        //<h2><NavLink to="/markdown">mrkdwn</NavLink></h2>
        return (
            <div id="left-side-menu" onMouseDown={this.props.handleMouseDown} className={visibility}>
                <h2><NavLink to="/">home</NavLink></h2>
                <h2><NavLink to="/track">track</NavLink></h2>
            </div>
        );
    };
};
