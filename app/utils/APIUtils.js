import sdk from 'sdk';
import {loginAndBootstrap} from '../actions/ActionCreators';

export function login(username, password) {
    sdk
        .user
        .login(username, password)
        .then(() => {
            return sdk.user.getAccountInfo();
        })
        .then((bootstrap) => {
            loginAndBootstrap(bootstrap);
        });
}
