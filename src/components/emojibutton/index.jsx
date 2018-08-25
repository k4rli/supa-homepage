import React, { Component } from 'react';
import './style.css';

export default class EmojiButton extends Component {
    render() {
        let emojiButtonClassName = 'emoji-button';

        const {
            className, handleMouseDown, text, id
        } = this.props;

        if (className !== undefined) {
            emojiButtonClassName += ` ${className}`;
        }
        return (
            <p
                className={emojiButtonClassName}
                id={id}
                onMouseDown={handleMouseDown}>

                {text}

            </p>
        );
    }
}
