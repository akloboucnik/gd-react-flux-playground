import BootstrapStore from './BootstrapStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';
import { EventEmitter } from 'events';
import { getUserList } from '../utils/APIUtils';

const CHANGE_EVENT = 'change';
let _users = [];
let _isLoading = true;

class UserStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register((payload) => {
            let {action} = payload;
            switch(action.type) {
                case ActionTypes.CLICK_USER_FILTER:
                    _isLoading = true;
                    // dispatch GET_USERS
                    // => call API method getUserList and provide it with projectId from BootstrapStore
                    getUserList(BootstrapStore.getProjectId());
                    this.emitChange();
                    break;

                case ActionTypes.GET_USERS:
                    _isLoading = false;
                    _users = action.users;
                    this.emitChange();
                    break;

                default:
            }

        });
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    isLoading() {
        return _isLoading;
    }

    getUsers() {
        return _users;
    }

}

let instance = new UserStore();

export default instance;

