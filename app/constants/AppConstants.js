import keyMirror from 'react/lib/keyMirror';

export default {
    ActionTypes: keyMirror({
        LOGIN_BOOTSTRAP: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};
