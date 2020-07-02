import axios from "axios";

/**
 * A wrapper around axios APIt that formats errors, etc
 * @param method the HTTP verb being used
 * @param path the route path / endpoint
 * @param data (optional) payload in JSON form for POST requests
 * @returns {Promise<JSON>}
 */
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data.error));
    });
}
