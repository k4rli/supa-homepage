import React, { Component } from 'react';
import LaughingCryingEmoji from './images/laughing_crying_emoji.svg';
import PointingFingerEmoji from './images/pointing_finger.svg';
import BackArrowEmoji from './images/back_emoji.svg';
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

        let imageSrc = LaughingCryingEmoji;
        if (text === '😂') {
            imageSrc = LaughingCryingEmoji;
        } else if (text === '🔙') {
            imageSrc = BackArrowEmoji;
        } else if (text === '👇') {
            imageSrc = PointingFingerEmoji;
        }

        const style = {
            backgroundImage: `url(${imageSrc})`
        }
        return (
            <p
                className={emojiButtonClassName}
                id={id}
                onMouseDown={handleMouseDown}
                style={style}
            >
                
            </p>
        );
    }
}
