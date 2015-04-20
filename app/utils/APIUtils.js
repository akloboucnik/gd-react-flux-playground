import sdk from 'sdk';
import {loginAndBootstrap} from '../actions/ActionCreators';

export function login(username, password) {
    sdk
        .user
        .login(username, password)
        .then(() => {
            return sdk.xhr.get('/gdc/app/account/bootstrap');
        })
        .then((result) => {
            loginAndBootstrap(result.bootstrapResource);
        });
}
