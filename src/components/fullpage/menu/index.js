import React, { Component } from 'react';
import "./style.css";
import NavigateTo from '../../navlink';

export default class Menu extends Component {
    render() {
        let visibility = "hide";
        if (this.props.menuVisibility) visibility = "show";
        // <h2><NavigateTo to="/gymfinder">gyms</NavigateTo></h2>
        // <h2><NavigateTo to="/markdown">mrkdwn</NavigateTo></h2>
        // <h2><NavigateTo to="/signup">signup</NavigateTo></h2>
        // <h2><NavigateTo to="/login">login</NavigateTo></h2>
        return (
            <div id="left-side-menu" onMouseDown={this.props.handleMouseDown} className={visibility}>
                <h2><NavigateTo to="/">home</NavigateTo></h2>
                <h2><NavigateTo to="/track">track</NavigateTo></h2>
            </div>
        );
    };
};
