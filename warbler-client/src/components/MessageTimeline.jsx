import React from "react";
import PropTypes from "prop-types";
import MessageList from "../containers/MessageList";

const MessageTimeline = props => {
    return (
        <div className={"row"}>
            <MessageList />
        </div>
    );
};

MessageTimeline.propTypes = {};

export default MessageTimeline;
