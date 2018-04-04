import React from 'react';

import Splash from './Splash.js';
import { Fullpage, Slide } from 'fullpage-react';
import SecondSlide from './SecondSlide.js';
import Menu from './Menu.js';

require('../normalize.css');
require('../skeleton.css');

const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 0 is default
  scrollSensitivity: 0,
  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 0 is default
  touchSensitivity: 1,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true,
  // optional, set the initial vertical slide
  activeSlide: 0
};

export default class FullpageReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0
		},
	  visible: false
    };
	this.handleMouseDown = this.handleMouseDown.bind(this);
	this.handleMouseDownOnMenu = this.handleMouseDownOnMenu.bind(this);
	this.toggleMenu = this.toggleMenu.bind(this);
    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.signUpClick = this.signUpClick.bind(this);
  }

	handleMouseDown(e) {
        this.toggleMenu();
		e.stopPropagation();
	}

    handleMouseDownOnMenu(e) {
        if (window.innerWidth <= 768) {
            this.toggleMenu();
        }
        e.stopPropagation();
    }

	toggleMenu() {
		this.setState({
			visible: !this.state.visible
		});
	}

    hideMenu() {
        this.setState({
            visible: false
        });
    }

    signUpClick() {
        const oldActive = this.state.active;
        console.log(oldActive);
        const sliderState = {
            active: {
                Fullpage: 1
            }
        };

        this.setState({
            visible: true
        });
        this.setState(sliderState);
    }

  onSlideChangeEnd(name, props, state, newState) {
    const oldActive = this.state.active;
    const sliderState = {
      [name]: newState.activeSlide
    };
    this.hideMenu();
    const updatedState = Object.assign(oldActive, sliderState);
    this.setState(updatedState);
  }

  componentDidMount() {

  }

  render() {
    fullPageOptions.slides = [
        <Slide onMouseDown={this.handleMouseDown} style={{backgroundColor: '#f0efed'}}>
            <div style={{width:'100vw', height:'100vh'}} onMouseDown={this.hideMenu}>
                <Splash handleMouseDown={this.handleMouseDown} text="😂"/>
            </div>
            <Menu handleMouseDown={this.handleMouseDownOnMenu}
                  menuVisibility={this.state.visible}
                  hideMenu={this.hideMenu}
            />
        </Slide>,
        <Slide style={{backgroundColor: '#F0efed'}}>
            <SecondSlide text="whats poppin"/>
        </Slide>
    ];

    return (
      <Fullpage onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}> </Fullpage>
    );
  };
};
