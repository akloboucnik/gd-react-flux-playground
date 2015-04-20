import keyMirror from 'react/lib/keyMirror';

export default {
    ActionTypes: keyMirror({
        LOGIN_BOOTSTRAP: null,
        GET_USERS: null,
        CLICK_USER_FILTER: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};
