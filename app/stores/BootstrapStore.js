import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import { ActionTypes } from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _bootstrapData = {};

class BootstrapStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register((payload) => {
            let {action} = payload;

            switch(action.type) {
                case ActionTypes.LOGIN_BOOTSTRAP:
                    _bootstrapData = action.bootstrap;
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

    getBootstrap() {
        return _bootstrapData;
    }

    getProjectId() {
        if (_bootstrapData.current) {
            return _bootstrapData.current.project.links.self.split('/')[3];
        }

        return null;
    }
}

let instance = new BootstrapStore();

export default instance;

