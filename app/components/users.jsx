import React from 'react';
import Table from 'react-bootstrap/lib/Table';

export default React.createClass({
    getInitialState() {
        return {
            users: [
                {
                    name: 'Alfons Mucha',
                    roles: ['admin']
                },
                {
                    name: 'Felix A',
                    roles: ['editor', 'viewer']
                }
            ]
        };
    },
    render() {
        let rows = this.state.users.map((row) => {
            return (
                <tr>
                    <td>{row.name}</td>
                    <td>{row.roles.reduce((acc, r) => { return acc + ', ' + r; })}</td>
                </tr>
            );
        });
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
})
