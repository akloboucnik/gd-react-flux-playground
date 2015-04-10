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

let {DefaultRoute, Link, Route, RouteHandler} = Router;

let App = React.createClass({
    render: function() {
        return (
            <div className="container-fluid">
                <NavBar inverse fixedTop brand='User mgmt'>
                    <Nav>
                        <li><Link to="users">Users</Link></li>
                    </Nav>
                </NavBar>
                <Grid>
                    <Row style={ {marginTop: '80px'} } className='show-grid'>
                        <Col md={4}>
                            <span>here be menu</span>
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
    <Route name="users" handler={Users}/>
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

