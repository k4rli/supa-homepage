import React, {Component} from 'react';
import EmojiButton from '../emojibutton';
import Menu from '../fullpage/menu';
import { NavLink } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
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

    handleChange = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState)
    };


    handleSubmit = (e, message) => {
        e.preventDefault();

        let formData = {
            formUsername: this.state.username,
            formPassword: this.state.password
        };

        if (formData.formUsername.length < 1 || formData.formPassword.length < 1) {
            return true
        }

        this.setState({
            username: '',
            password: ''
        })
    };

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

    render() {
        return (
            <div className="signup-wrapper">
                <div className="floatingMenuButton" onMouseDown={this.hideMenu}>
                    <EmojiButton handleMouseDown={this.handleMouseDown} text="😂"/>
                </div>
                <Menu handleMouseDown={this.handleMouseDownOnMenu}
                      menuVisibility={this.state.visible}
                      hideMenu={this.hideMenu}
                />
                <div className="signup-form" onMouseDown={this.hideMenu}>
                    <form className='react-form' onSubmit={this.handleSubmit}>
                        <h1>login</h1>
                        <input id='formName' className='form-input' name='username' type='text' required onChange={this.handleChange} placeholder='username' value={this.state.username} />
                        <input id='formSubject' className='form-input' name='password' type='password' required onChange={this.handleChange} placeholder='password' value={this.state.password} />
                        <input id='formButton' className='btn' type='submit' value='Log in' />
                    </form>
                    <NavLink className="logInRedirect" to="/signup">sign up instead</NavLink>
                </div>
            </div>
        );
    }
}
