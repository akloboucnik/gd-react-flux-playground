import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';
import { login } from '../utils/APIUtils';

export function loginAndBootstrap(bootstrapData) {
    AppDispatcher.handleServerAction({
        type: ActionTypes.LOGIN_BOOTSTRAP,
        bootstrap: bootstrapData
    });
}

