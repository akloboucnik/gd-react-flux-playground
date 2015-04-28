import sdk from 'sdk';
import {loginAndBootstrap, getUsers} from '../actions/ActionCreators';

export function login(username, password) {
    return sdk.user.login(username, password);
}

export function bootstrap() {
    return sdk.xhr.get('/gdc/app/account/bootstrap');
}

export function getUserList(projectId) {
    let uri = `/gdc/projects/${projectId}/userlist?offset=0&limit=50&indicatePermission=canExecute&userState=ACTIVE`;
    return sdk.xhr.get(uri);
}

