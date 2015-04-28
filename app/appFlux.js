import { Flux } from 'flummox';
import { LoginStore } from './stores/LoginStore';
import { LoginActions } from './actions/LoginActions';
import UserStore from './stores/UserStore';
import { UserActions } from './actions/UserActions';

export class AppFlux extends Flux {
    constructor() {
        super();

        this.createActions('login', LoginActions);
        this.createStore('login', LoginStore, this);
        this.createActions('user', UserActions);
        this.createStore('user', UserStore, this);
    }
}

