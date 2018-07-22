import React, { Component } from 'react';
import './style.css';

export default class EmojiButton extends Component {
    render() {
        return (
            <p className='emoji-button' id={this.props.id} onMouseDown={this.props.handleMouseDown}>{this.props.text}</p>
        );
    }
}