import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Icon from 'react-bootstrap/lib/Glyphicon';

export default class LoginInfo extends React.Component {
    displayName: 'LoginInfo'
    propTypes: {
        bootstrap: React.PropTypes.object.isRequired
    }

    render() {
        let account = this.props.bootstrap.accountSetting,
            userName;
        // TODO add proper loading state
        if(account && account.login) {
            userName = `${account.firstName} ${account.lastName}`;
        }
        return (
            <Nav right>
                <NavItem>
                    <Icon glyph='user'/>&nbsp;&nbsp;{userName}
                </NavItem>
            </Nav>
        );
    }
};

