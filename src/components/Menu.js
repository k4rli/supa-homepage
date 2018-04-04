import React, { Component } from "react";
import "./css/Menu.css";
import NavLink from './NavLink';
import { Link } from "react-router-dom";

export default class Menu extends Component {
    render() {
        let visibility = "hide";
        if (this.props.menuVisibility) {
            visibility = "show";
        }
        return (
            <div id="left-side-menu" onMouseDown={this.props.handleMouseDown} className={visibility}>
                <h2><NavLink to="/">home</NavLink></h2>
                <h2><Link to="/login">login</Link></h2>
                <h2><NavLink to="/signup">signup</NavLink></h2>
                <h2><NavLink to="/track">track</NavLink></h2>
            </div>
        );
    };
};
