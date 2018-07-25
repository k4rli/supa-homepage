import React, { Component } from 'react';
import './style.css';

export default class EmojiButton extends Component {
    render() {
        let className = 'emoji-button';
        if (this.props.className !== undefined) {
            className += ' ' + this.props.className;
        }
        return (
            <p className={className} id={this.props.id} onMouseDown={this.props.handleMouseDown}>{this.props.text}</p>
        );
    }
}