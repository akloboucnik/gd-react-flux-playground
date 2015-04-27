import { Flux } from 'flummox';
import { LoginStore } from './stores/LoginStore';
import { LoginActions } from './actions/LoginActions';

export class AppFlux extends Flux {
    constructor() {
        super();

        this.createActions('login', LoginActions);
        this.createStore('login', LoginStore, this);
    }
}

