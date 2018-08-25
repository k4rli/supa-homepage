import React, { Component } from 'react';
import "./style.css";
import NavigateTo from '../../navlink';
import { connect } from 'react-redux';

import io from 'socket.io-client'
import OAuth from '../../../auth/OAuth';
import { API_URL } from '../../../auth/config'
const socket = io(API_URL)
const providers = ['twitter', 'google']

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            visible: false,
            disabled: ''
        };
    }

    render() {
        const buttons = (providers, socket) => (this.props.user !== undefined && this.props.user.provider !== undefined)
                ? <OAuth provider={this.props.user.provider} key={this.props.user.provider} socket={socket}/>
                : providers.map(provider =>
                    <OAuth
                        provider={provider}
                        key={provider}
                        socket={socket}
                />);

        let visibility = "hide";
        if (this.props.menuVisibility) visibility = "show";
        // <h2><NavigateTo to="/gymfinder">gyms</NavigateTo></h2>
        // <h2><NavigateTo to="/markdown">mrkdwn</NavigateTo></h2>
        // <h2><NavigateTo to="/signup">signup</NavigateTo></h2>
        // <h2><NavigateTo to="/login">login</NavigateTo></h2>
        return (
            <div id="left-side-menu" onMouseDown={this.props.handleMouseDown} className={visibility}>
                <div className="auths-wrapper">
                    {this.state.loading
                        ? 'loading...'
                        : buttons(providers, socket)
                    }
                </div>

                <h2><NavigateTo to="/">home</NavigateTo></h2>
                <h2><NavigateTo to="/track">track</NavigateTo></h2>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return {
        user: state.login,
    };
}

export default connect(mapStateToProps)(Menu);
