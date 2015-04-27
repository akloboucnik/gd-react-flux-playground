import React, { PropTypes } from 'react';
import Router from 'react-router';

import NavBar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Users from './components/users';
import LoginInfo from './components/loginInfo';
import Tab from './components/tab';
import BootstrapStore from './stores/BootstrapStore';
import AppDispatcher from './dispatcher/AppDispatcher';
import { PayloadSources, ActionTypes } from './constants/AppConstants';
import { AppFlux } from './appFlux';
import FluxComponent from 'flummox/component';

// TODO add proper login
const {USER, PASS} = require('../.credentials');
const flux = new AppFlux();
const loginActions = flux.getActions('login');
loginActions.login(USER, PASS);

let {DefaultRoute, Link, Route, RouteHandler} = Router;

let App = React.createClass({
    render() {
        return (
            <div className="container-fluid">
                <NavBar inverse fixedTop brand='User mgmt'>
                    <Nav>
                        <li>
                            <a href="https://localhost:8443/dashboard.html">Dashboard</a>
                        </li>
                        <Tab to="home">Users</Tab>
                    </Nav>
                    <FluxComponent connectToStores={['login']}>
                        <LoginInfo />
                    </FluxComponent>
                </NavBar>
                <Grid>
                    <Row style={ {marginTop: '80px'} } className='show-grid'>
                        <Col md={4}>
                            <Nav bsStyle='pills' stacked>
                                <Tab to="home" query={{}}>Active</Tab>
                                <Tab to="home" query={{state: 'INVITED'}}>Invited</Tab>
                                <Tab to="home" query={{state: 'DEACTIVATED'}}>Deactivated</Tab>
                            </Nav>
                        </Col>
                        <Col md={8}>
                            <RouteHandler />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute name="home" handler={Users}/>
    </Route>
);


Router.run(routes, function (Handler, state) {
    React.render(
    <FluxComponent flux={flux}>
        <Handler/>
    </FluxComponent>, document.getElementById('app'));
});

if (DEBUG) {
    console.log('dev');
} else {
    console.log('production');
}

