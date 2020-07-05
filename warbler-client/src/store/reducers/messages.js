import { LOAD_MESSAGES, REMOVE_MESSAGES } from "../actionTypes";

const messages = (state = [], action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGES:
            return state;
        default:
            return state;
    }
};

export default messages;
