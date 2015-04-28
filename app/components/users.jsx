import React from 'react';
import connectToStores from 'flummox/connect';

import Table from 'react-bootstrap/lib/Table';
import Spinner from 'react-spinkit';

let comp = class Users extends React.Component {
    componentWillReceiveProps(newProps) {
        if(newProps.projectId && this.props.projectId !== newProps.projectId) {
            setTimeout(() => {
                this.props.flux.getActions('user').getUsers(newProps.projectId);
            }, 100);
        }
    }

    render() {
        let rows = this.props.users.map((row) => {
            return (
                <tr>
                    <td>{row.firstName} {row.lastName}</td>
                    <td>{row.roles.reduce((acc, r) => { return acc + ', ' + r; })}</td>
                </tr>
            );
        });
        if (this.props.loading === true) {
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
};

comp = connectToStores(comp, {
    login: store => ({
        projectId: store.getProjectId()
    }),
    user: store => ({
        users: store.getUsers(),
        loading: store.isLoading()
    })
});

export default comp;
