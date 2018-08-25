import React, { Component } from 'react';
import './style.css';
import Menu from '../fullpage/menu';
import EmojiButton from '../emojibutton';
import NavigateTo from '../navlink'
class Signup extends Component {
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
            formEmail: this.state.email,
            formPassword: this.state.password
        };

        if (formData.formUsername.length < 1 
            || formData.formEmail.length < 1 
            || formData.formPassword.length < 1) {
            return true
        }

        this.setState({
            username: '',
            email: '',
            password: ''
        })
    };

    handleMouseDown(e) {
        this.toggleMenu();
        e.stopPropagation();
    }

    handleMouseDownOnMenu(e) {
        if (window.innerWidth <= 768) this.toggleMenu();
        e.stopPropagation();
    }

    toggleMenu() {
        this.setState({ visible: !this.state.visible });
    }

    hideMenu() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div className="signup-wrapper">
                <div className="floatingMenuButton" onMouseDown={this.hideMenu}>
                    <EmojiButton handleMouseDown={this.handleMouseDown} text="😂" />
                </div>
                <Menu handleMouseDown={this.handleMouseDownOnMenu}
                    menuVisibility={this.state.visible}
                    hideMenu={this.hideMenu}
                />
                <div className="signup-form" onMouseDown={this.hideMenu}>
                    <form className='react-form' onSubmit={this.handleSubmit}>
                        <h1>join</h1>
                        <input id='formName' className='form-input' name='username' type='text' required onChange={this.handleChange} placeholder='username' value={this.state.username} />
                        <input id='formEmail' className='form-input' name='email' type='email' required onChange={this.handleChange} placeholder='email' value={this.state.email} />
                        <input id='formSubject' className='form-input' name='password' type='password' required onChange={this.handleChange} placeholder='password' value={this.state.password} />

                        <input id='formButton' className='btn' type='submit' value='Sign up' />
                    </form>
                    <NavigateTo className="logInRedirect" to="/login">log in instead</NavigateTo>
                </div>
            </div>
        );
    }
}

export default Signup;
