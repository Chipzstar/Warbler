import { apiCall } from "../../api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user,
    };
};

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwt_token", token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve();
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject(err);
                });
        });
    };
}
