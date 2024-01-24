/* eslint-disable linebreak-style */
/* eslint-disable indent */

const state = {
    users: [],
};

const actions = {
    setUsers(users) {
        state.users = [
            ...state.users,
            ...users,
        ];
    },
    logUsers() {
        console.log(state.users);
    },
};

export { state, actions };
