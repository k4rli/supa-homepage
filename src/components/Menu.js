import React, { Component } from "react";
import "./Menu.css";
import NavLink from './NavLink';

class Menu extends Component {
  render() {
    var visibility = "hide";
    if (this.props.menuVisibility) {
      visibility = "show";
    }
    return (
            <div id="left-side-menu" onMouseDown={this.props.handleMouseDown} className={visibility}>
                {/*<h2><NavLink to="/">home</NavLink></h2>*/}
                {/*<h2><NavLink to="/projects">projects</NavLink></h2>*/}
                {/*<h2><NavLink to="/about">about</NavLink></h2>*/}
            </div>
    );
  }
}

export default Menu;
