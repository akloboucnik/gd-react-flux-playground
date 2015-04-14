import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Icon from 'react-bootstrap/lib/Glyphicon';

export default React.createClass({
    displayName: 'LoginInfo',
    propTypes: {
        isLoading: React.PropTypes.bool.isRequired,
        bootstrap: React.PropTypes.object.isRequired
    },

    render() {
        let userName;
        if(this.props.isLoading) {
            userName = 'Loading...';
        } else {
            userName = `${this.props.bootstrap.firstName} ${this.props.bootstrap.lastName}`;
        }

        return (
            <Nav right>
                <MenuItem>
                    <Icon glyph='user'/>&nbsp;&nbsp;{userName}
                </MenuItem>
            </Nav>
        );
    }
});

