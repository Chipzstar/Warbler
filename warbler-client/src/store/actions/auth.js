import { apiCall, setTokenHeader } from "../../api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user,
    };
};

export const setAuthorizationToken = token => {
    setTokenHeader(token);
};

export function logout() {
    return dispatch => {
        localStorage.removeItem("jwt_token");
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("POST", `/api/auth/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwt_token", token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve();
                })
                .catch(err => {
                    if (err) dispatch(addError(err.message));
                    else
                        dispatch(
                            addError("Api endpoint could not be accessed!")
                        );
                    reject(err);
                });
        });
    };
}
