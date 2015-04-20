import sdk from 'sdk';
import {loginAndBootstrap, getUsers} from '../actions/ActionCreators';

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

export function getUserList(projectId) {
    let uri = `/gdc/projects/${projectId}/userlist?offset=0&limit=50&indicatePermission=canExecute&userState=ACTIVE`;
    sdk
       .xhr
       .get(uri)
       .then((result) => {
           getUsers(result.userList.items);
       });
}

