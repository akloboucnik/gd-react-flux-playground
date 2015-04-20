import React, { PropTypes} from 'react';
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
import { login } from './utils/APIUtils';
import BootstrapStore from './stores/BootstrapStore';
import AppDispatcher from './dispatcher/AppDispatcher';
import { PayloadSources, ActionTypes } from './constants/AppConstants';

// TODO add proper login
const {USER, PASS} = require('../.credentials');
login(USER, PASS);

// TODO how to trigger initial page load
// FIXME how to work with async dependencies between stores?
//  - now I hope that bootstrap finishes in 4s because I need
//  project Id from BootStrap store
setTimeout(() => {
    AppDispatcher.dispatch({
        source: PayloadSources.VIEW_ACTION,
        action: { type: ActionTypes.CLICK_USER_FILTER }
    });
}, 4000);

let {DefaultRoute, Link, Route, RouteHandler} = Router;
function getStateFromStores() {
    return {
        bootstrap: BootstrapStore.getBootstrap()
    };
}

let App = React.createClass({
    // FIXME does it need to be here to be able to pass queryParams down
    // the component tree?
    propTypes: {
        params: PropTypes.object.isRequired,
        query: PropTypes.object.isRequired
    },
    getInitialState() {
        return getStateFromStores();
    },
    componentDidMount() {
        BootstrapStore.addChangeListener(this._onChange);
    },
    _onChange() {
        this.setState(getStateFromStores());
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
                            <Nav bsStyle='pills' stacked>
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


Router.run(routes, function (Handler, state) {
    // TODO Fire action to RouterStore
    // FIXME should RouterStore exists and "redispatch" changes to e.g. queryParams to
    // appropriate stores? (e.g. change of state to UserStore to get filtered List?
    // or should this be fired by click handlers on filters?
    var userState = state.query.state || 'ACTIVE';
    React.render(<Handler/>, document.getElementById('app'));
});

if (DEBUG) {
    console.log('dev');
} else {
    console.log('production');
}

