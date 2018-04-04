import React, {Component} from 'react';
import './css/secondslide.css';

export default class SecondSlide extends Component {
	render() {
		return (
			<p id="epictext">{this.props.text}</p>
		);
	}
}
