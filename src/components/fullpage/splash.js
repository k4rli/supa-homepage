import React, { Component } from 'react';
import './style.css';

export default class Splash extends Component {
	render() {
		return (
			<div className="splash-wrapper">
				<p id="epicemoji" onMouseDown={this.props.handleMouseDown}>{this.props.text}</p>
				<p id="shittydownarrow"><span aria-label="jsx-a11y/accessible-emoji" role='img' >👇</span></p>
			</div>
		);
	}
}
