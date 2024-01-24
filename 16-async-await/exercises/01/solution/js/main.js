/* eslint-disable linebreak-style */
/* eslint-disable indent */
async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.users;
    } catch (error) {
        throw new Error(`Request error: ${error}`);
    }
}

export default request;
