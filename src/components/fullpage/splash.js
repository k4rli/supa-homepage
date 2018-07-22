import React, { Component } from 'react';
import EmojiButton from '../emojibutton';
import './style.css';

export default class Splash extends Component {
	render() {
		return (
			<div className="splash-wrapper">
				<div className="floatingMenuButton" onMouseDown={this.props.onMouseDown}>
					<EmojiButton id="epicemoji" text={this.props.text} />
				</div>
				<EmojiButton id="shittydownarrow" text='👇' />
			</div>
		);
	}
}
