import React from 'react';
import { Fullpage, Slide } from 'fullpage-react';
import Splash from './splash';
import SecondSlide from './secondslide';
import Menu from './menu';
import '../../css/normalize.css';
import '../../css/skeleton.css';

/*global window*/

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

    onSlideChangeEnd(name, props, state, newState) {
        const { active } = this.state;
        const oldActive = active;
        const sliderState = {
            [name]: newState.activeSlide
        };
        this.hideMenu();
        const updatedState = Object.assign(oldActive, sliderState);
        this.setState(updatedState);
    }

    handleMouseDownOnMenu(e) {
        if (window.innerWidth <= 768) {
            this.toggleMenu();
        }
        e.stopPropagation();
    }

    handleMouseDown(e) {
        this.toggleMenu();
        e.stopPropagation();
    }

    toggleMenu() {
        const { visible } = this.state;
        this.setState({ visible: !visible });
    }

    hideMenu() {
        this.setState({ visible: false });
    }

    signUpClick() {
        const sliderState = {
            active: {
                Fullpage: 1
            }
        };

        this.setState({ visible: true });
        this.setState(sliderState);
    }

    render() {
        const { visible } = this.state;
        fullPageOptions.slides = [
            <Slide onMouseDown={this.handleMouseDown} style={{ backgroundColor: '#F2EEDD', backgroundImage: 'linear-gradient(to bottom, #7DE2FC 0%, #ffecd2 100%)' }}>
                <div style={{ width: '100vw', height: '100vh' }} onMouseDown={this.hideMenu}>
                    <Splash onMouseDown={this.handleMouseDown} text="😂" />
                </div>
                <Menu
                    handleMouseDown={this.handleMouseDownOnMenu}
                    menuVisibility={visible}
                    hideMenu={this.hideMenu}
                />
            </Slide>,
            <Slide style={{ backgroundColor: '#F2EEDD', backgroundImage: 'linear-gradient(to bottom, #ffecd2 0%, #7DE2FC 100%)' }}>
                <SecondSlide text="whats poppin" />
            </Slide>
        ];

        return (
            <Fullpage onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions} />
        );
    }
}
