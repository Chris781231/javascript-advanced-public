/* eslint-disable linebreak-style */
import { state, actions } from './store/ajaxRequest.js';

/**
 * Represents a request factory
 * @param {Object}                    - request properties object
 * @param {string} url                - the request url
 * @param {function} successCallback  - run, when request status is  200 and state is 4
 * @param {string} [method=GET]       - the request method
 * @param {number} [maxRetry=2]       - how many times to retry send the request
 * @param {number} [delay=5000]       - the delay in milisec beetween two retry
 * @returns {function}                - the reqeust function, witch send the request
 */
function ajaxRequest({
  url,
  successCallback,
  method = 'GET',
  delay = 5000,
  maxRetry = 2,
} = {}) {
  actions.initRequest(maxRetry, delay);

  /**
   * Log error message to the console.error
   * @param {string} message - the error message
   */
  function handleError(message) {
    throw new Error(message);
  }

  /**
   * Handle ajax onload event
   * @param {Object} xhr - the error message
   */
  function handleLoad(response) {
    console.log(response.responseText);
    // successCallback(response.responseText);
  }

  /**
   * Send ajax request
   */
  function request() {
    const xhr = new XMLHttpRequest();
    xhr.timeout = state.delay;
    xhr.onerror = () => {
      handleError(Error.message);
    };
    xhr.onloadend = () => {
      if (xhr.status === 404) {
        handleError(new Error(`Resource not available: ${url}`));
      }
      if (xhr.readyState === 4 && xhr.status === 200) {
        handleLoad(xhr);
      }
    };

    xhr.open(method, url);
    xhr.send();
  }

  return request;
}

export default ajaxRequest;
