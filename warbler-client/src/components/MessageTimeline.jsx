import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";

const MessageTimeline = ({ username, profileImageURL }) => {
    return (
        <div className={"row"}>
            <UserAside profileImage={profileImageURL} username={username} />
            <MessageList />
        </div>
    );
};

export default MessageTimeline;
