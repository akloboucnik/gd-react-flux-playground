import { Actions } from 'flummox';
import { login as apiLogin,
         bootstrap as apiBootstrap } from '../utils/APIUtils';

// XXX responses have to be wrapped to Promise.resolve
// shim provided by webpack because SDK's jquery promise is
// not a real promise
// @see https://github.com/acdlite/flummox/issues/145
export class LoginActions extends Actions {
    login(username, password) {
        let $promise = apiLogin(username, password);

        return Promise.resolve($promise.then(apiBootstrap));
    }
}

