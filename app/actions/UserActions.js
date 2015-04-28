import { Actions } from 'flummox';
import { getUserList as apiGetUsers } from '../utils/APIUtils';

export class UserActions extends Actions {
    getUsers(projectId, state = 'ACTIVE') {
        return Promise.resolve(apiGetUsers(projectId));
    }
}

