import { apiCall } from "../../api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGES } from "../actionTypes";

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages,
});

export const remove = id => ({
    type: REMOVE_MESSAGES,
    id,
});

export const fetchMessages = () => {
    return dispatch => {
        return apiCall("GET", "/api/messages")
            .then(res => dispatch(loadMessages(res)))
            .catch(err => dispatch(addError(err.message)));
    };
};

export const createNewMessage = text => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const id = currentUser.user["_id"];
        return apiCall("POST", `/api/users/${id}/messages`, { text })
            .then(res => {})
            .catch(err => {
                console.error(err);
                dispatch(addError(err.message));
            });
    };
};

export const updateMessage = (text, userId, messageId) => {
    return dispatch => {
        return apiCall("PUT", `/api/users/${userId}/messages/${messageId}`, {
            text,
        })
            .then(res => console.log("Message Updated", res))
            .catch(err => {
                console.error(err);
                dispatch(addError(err.message));
            });
    };
};

export const deleteMessage = (userId, messageId) => {
    return dispatch => {
        return apiCall("DELETE", `/api/users/${userId}/messages/${messageId}`)
            .then(() => dispatch(remove(messageId)))
            .catch(err => {
                console.error(err);
                dispatch(addError(err.message));
            });
    };
};
