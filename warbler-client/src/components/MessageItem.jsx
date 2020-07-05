import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../assets/images/default-profile-image.jpg";

const MessageItem = ({
    date,
    profileImageURL,
    username,
    text,
    removeMessage,
}) => {
    return (
        <div>
            <li className={"list-group-item"}>
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
                        <Moment className='text-muted' format='DD/MM/YYYY'>
                            {date}
                        </Moment>
                    </span>
                    <p>{text}</p>
                    {removeMessage && (
                        <a className='btn btn-danger' onClick={removeMessage}>
                            delete
                        </a>
                    )}
                </div>
            </li>
        </div>
    );
};

MessageItem.propTypes = {
    date: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string,
    removeMessage: PropTypes.func,
};

export default MessageItem;
