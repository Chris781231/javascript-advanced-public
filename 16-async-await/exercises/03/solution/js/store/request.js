/* eslint-disable linebreak-style */
/* eslint-disable indent */
const state = {
    delay: 5000,
    maxRetry: 2,
    retryCounter: 0,
};

const actions = {
    initState(maxRetry, delay) {
        actions.setMaxRetry(maxRetry);
        actions.setDelay(delay);
    },

    setMaxRetry(maxRetry) { state.maxRetry = maxRetry; },

    setDelay(delay) { state.delay = delay; },

    initRetryCounter() { state.retryCounter = 0; },

    increaseRetryCounter() { state.retryCounter += 1; },
};

export { state, actions };
