import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigateTo extends Component {
    render() {
        return (
            <NavLink {...this.props} />
        );
    }
};
