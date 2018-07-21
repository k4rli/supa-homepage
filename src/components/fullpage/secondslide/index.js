import React, { Component } from 'react';
import './style.css';

export default class SecondSlide extends Component {
	render() {
		return (
			<div>
				<p id="epictext">{this.props.text}</p>
                <div id="epic-ye-slide"></div>
			</div>
		);
	}
}
