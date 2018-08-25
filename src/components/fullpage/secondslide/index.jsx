import React, { Component } from 'react';
import './style.css';

export default class SecondSlide extends Component {
	render() {
		const { text } = this.props;
		return (
			<div>
				<p id="epictext">{text}</p>
                <div id="epic-ye-slide" />
			</div>
		);
	}
}
