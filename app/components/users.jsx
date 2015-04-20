import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import UserStore from '../stores/UserStore';
import Spinner from 'react-spinkit';

function getStateFromStores() {
    return {
        users: UserStore.getUsers(),
        loading: UserStore.isLoading()
    };
}

export default React.createClass({
    getInitialState() {
        return getStateFromStores();
    },
    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    },
    _onChange() {
        this.setState(getStateFromStores());
    },

    render() {
        let rows = this.state.users.map((row) => {
            return (
                <tr>
                    <td>{row.firstName} {row.lastName}</td>
                    <td>{row.roles.reduce((acc, r) => { return acc + ', ' + r; })}</td>
                </tr>
            );
        });
        if (this.state.loading) {
            return <Spinner spinnerName='three-bounce'/>;
        } else {
            return (
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            );
        }
    }
})
