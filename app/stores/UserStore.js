import { Store } from 'flummox';
import LoginStore from './LoginStore';

export default class UserStore extends Store {
    constructor(flux) {
        super();

        const userActionIds = flux.getActionIds('user');
        this.registerAsync(userActionIds.getUsers, this.handleUserListStart, this.handleUserList, this.handleUserListError);

        this.replaceState({
            loading: true,
            error: false,
            users: []
        });
    }

    handleUserListStart() {
        this.replaceState({
            loading: true,
            error: false,
            users: []
        });
        console.log(' users list start === ');
    }

    handleUserList(data) {
        console.log(' users list  === ', data);
        this.replaceState({
            loading: false,
            error: false,
            users: data.userList.items
        });
    }

    handleUserListError(err) {
        this.replaceState({
            loading: false,
            error: true,
            users: [],
            errorData: err
        });
    }

    getUsers() {
        return this.state.users;
    }

    isLoading() {
        return this.state.loading;
    }
}

