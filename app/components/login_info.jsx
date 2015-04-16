import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Icon from 'react-bootstrap/lib/Glyphicon';

export default React.createClass({
    displayName: 'LoginInfo',
    propTypes: {
        bootstrap: React.PropTypes.object.isRequired
    },

    render() {
        let userName;
        // TODO add proper loading state
        if(this.props.bootstrap.login) {
            userName = `${this.props.bootstrap.firstName} ${this.props.bootstrap.lastName}`;
        }
        return (
            <Nav right>
                <NavItem>
                    <Icon glyph='user'/>&nbsp;&nbsp;{userName}
                </NavItem>
            </Nav>
        );
    }
});

