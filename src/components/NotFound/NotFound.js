import React, { Component } from 'react';
import './notfound.css';
import ye from './resources/ye.png';
import NavLink from "../NavLink";

export default class NotFound extends Component {
    render() {
        return (
            <div className="wrapper">
                <div id="title">
                    <p>tfw 404</p>
                </div>
                <div id="epic-ye">
                    <NavLink to="/">
                    <img src={ye} alt=""/>
                    </NavLink>
                </div>
            </div>
        );
    }
}