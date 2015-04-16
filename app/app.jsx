import React from 'react';
// import Alert from 'react-bootstrap/lib/Alert';
import Router from 'react-router';
import NavBar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Users from './components/users';
import Login from './components/login_info';
import Tab from './components/tab';
import sdk from 'sdk';

// TODO add proper login
const {USER, PASS} = require('../.credentials');

let {DefaultRoute, Link, Route, RouteHandler} = Router;

let App = React.createClass({
    getInitialState() {
        return {
            loadingBootstrap: true,
            bootstrap: {}
        };
    },
    componentDidMount() {
        sdk.user
        .login(USER, PASS)
        .then(() => {
            return sdk.user.getAccountInfo();
        })
        .then((bootstrap) => {
            this.setState({
                loadingBootstrap: false,
                bootstrap: bootstrap
            });
        });

    },
    handleUserStateFilterChange() {
        debugger;
    },

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
                    <Login isLoading={this.state.loadingBootstrap} bootstrap={this.state.bootstrap} />
                </NavBar>
                <Grid>
                    <Row style={ {marginTop: '80px'} } className='show-grid'>
                        <Col md={4}>
                            <Nav bsStyle='pills' stacked onSelect={this.handleUserStateFilterChange}>
                                <Tab to="home" query="">Active</Tab>
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


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

if (DEBUG) {
    console.log('dev');
} else {
    console.log('production');
}

