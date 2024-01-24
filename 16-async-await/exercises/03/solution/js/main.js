/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-promise-reject-errors */
import { actions as userActions } from './store/users.js';
import { actions as requestActions, state as requestState } from './store/request.js';

const urls = ['./json1/users1.json', './json/users2.json', './json/users3.json'];

const request = async (method, url) => {
    try {
        requestActions.initRetryCounter();
        return handleRequest(method, url);
    } catch (error) {
        return handleError({ error, method, url });
    }
};

const handleRequest = async (method, url) => {
    const response = await fetch(url, { method });
        if (response.ok) {
            return handleSuccess(response);
        }
        if (response.status === 404) {
            return handleError(response, method, url);
        }
        return Promise.reject(`some other error: ${response.status}`);
};

const handleSuccess = async (response) => {
    const result = await response.json();
    return result.users;
};

const handleError = (cause, method, url) => {
    console.log(requestState.retryCounter);
    if (requestState.retryCounter <= requestState.maxRetry) {
        requestActions.increaseRetryCounter();
        setTimeout(handleRequest, requestState.delay, method, url);
    } else {
        try {
            if (cause.status) return Promise.reject(`False Response: ${cause.status}`);
        } catch (error) {
            return Promise.reject(`MyError: ${error}`);
        }
    }
};

urls.forEach((url) => request('GET', url)
    .then(userActions.setUsers)
    .then(userActions.logUsers)
    .catch(console.error));
