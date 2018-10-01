import React, { Component } from 'react';
import { connect } from 'react-redux';

import io from 'socket.io-client';
import NavigateTo from '../../navlink';
import OAuth from '../../../auth/OAuth';
import { API_URL } from '../../../auth/config';

import './style.css';

const socket = io(API_URL);
const providers = ['twitter', 'google'];

class Menu extends Component {
    render() {
        const { user } = this.props;
        const { provider } = user;
        const buttons = (providers, socket) => (
            (user !== undefined && provider !== undefined)
                ? (
                    <OAuth
                        provider={provider}
                        key={provider}
                        socket={socket}
                    />
                )
                : (
                    providers.map(key => (
                        <OAuth
                            provider={key}
                            key={key}
                            socket={socket}
                        />
                    ))
                )
        );

        const { menuVisibility, handleMouseDown } = this.props;
        let visibility = 'hide';
        if (menuVisibility) {
            visibility = 'show';
        }
        // <h2><NavigateTo to="/gymfinder">gyms</NavigateTo></h2>
        // <h2><NavigateTo to="/markdown">mrkdwn</NavigateTo></h2>
        // <h2><NavigateTo to="/signup">signup</NavigateTo></h2>
        // <h2><NavigateTo to="/login">login</NavigateTo></h2>
        return (
            <div id="left-side-menu" role="presentation" onMouseDown={handleMouseDown} className={visibility}>
                <div className="auths-wrapper">
                    {buttons(providers, socket)}
                </div>
                <h2><NavigateTo to="/">home</NavigateTo></h2>
                <h2><NavigateTo to="/track">track</NavigateTo></h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login,
    };
}

export default connect(mapStateToProps)(Menu);
