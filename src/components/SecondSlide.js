import React, {Component} from 'react';
import './css/secondslide.css';
import ye from './NotFound/resources/ye2.png';

export default class SecondSlide extends Component {
	render() {
		return (
			<div>
				<p id="epictext">{this.props.text}</p>
                <div id="epic-ye-slide">
                    <img src={ye} draggable='false' alt=""/>
                </div>
			</div>
		);
	}
}
