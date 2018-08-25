import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import EmojiButton from '../emojibutton';
import Menu from '../fullpage/menu';

/*global window*/

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseDownOnMenu = this.handleMouseDownOnMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    handleChange(e) {
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }


    handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        const formData = {
            formUsername: username,
            formPassword: password
        };

        if (formData.formUsername.length < 1 || formData.formPassword.length < 1) {
            return;
        }

        this.setState({
            username: '',
            password: ''
        });
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
        this.setState((prevState) => {
            visible: !prevState.visible
        });
    }

    hideMenu() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { visible } = this.state;
        const { username, password } = this.state;
        return (
            <div className="signup-wrapper">
                <div className="floatingMenuButton" onMouseDown={this.hideMenu}>
                    <EmojiButton handleMouseDown={this.handleMouseDown} text="😂" />
                </div>
                <Menu
                    handleMouseDown={this.handleMouseDownOnMenu}
                    menuVisibility={visible}
                    hideMenu={this.hideMenu}
                />
                <div className="signup-form" onMouseDown={this.hideMenu}>
                    <form className="react-form" onSubmit={this.handleSubmit}>
                        <h1>login</h1>
                        <input id="formName" className="form-input" name="username" type="text" required onChange={this.handleChange} placeholder="username" value={username} />
                        <input id="formSubject" className="form-input" name="password" type="password" required onChange={this.handleChange} placeholder="password" value={password} />
                        <input id="formButton" className="btn" type="submit" value="Log in" />
                    </form>
                    <NavLink className="logInRedirect" to="/signup">sign up instead</NavLink>
                </div>
            </div>
        );
    }
}
