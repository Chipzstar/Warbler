import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../assets/images/default-profile-image.jpg";

const MessageItem = ({ date, profileImageURL, username, text }) => {
    return (
        <div>
            <img
                src={profileImageURL || DefaultProfileImg}
                alt={`Avatar of ${username}`}
                height={"100"}
                width={"100"}
                className={"timeline-img"}
            />
            <div className='message-area'>
                <Link to='/'>@{username} &nbsp;</Link>
                <span className='text-muted'>
                    <Moment className='text-muted' format='DD/MM/YYY'>
                        {date}
                    </Moment>
                </span>
                <p>{text}</p>
            </div>
        </div>
    );
};

MessageItem.propTypes = {
    date: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string,
};

export default MessageItem;
