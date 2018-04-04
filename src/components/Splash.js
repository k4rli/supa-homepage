import React, {Component} from 'react';
import './css/splashstyle.css';

export default class Splash extends Component {
	render() {
		return (
			<p id="epicemoji" onMouseDown={this.props.handleMouseDown}>{this.props.text}</p>
		);
	}
}
