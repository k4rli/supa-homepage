import React, { Component } from 'react';
import './style.css';

export default class Splash extends Component {
    render() {
        return (
            <p id="emojibutton" onMouseDown={this.props.handleMouseDown}>{this.props.text}</p>
        );
    }
}