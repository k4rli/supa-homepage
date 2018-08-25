import React, { Component } from 'react';
import EmojiButton from '../emojibutton';
import './style.css';

export default class Splash extends Component {
	render() {
		const { onMouseDown, text } = this.props;
		return (
			<div className="splash-wrapper">
				<div className="floatingMenuButton" onMouseDown={onMouseDown}>
					<EmojiButton id="epicemoji" text={text} className="center" />
				</div>
				<div className="floatingMenuButton">
					<EmojiButton id="shittydownarrow" text="👇" className="bottom-right" />
				</div>
			</div>
		);
	}
}
