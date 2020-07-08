import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../assets/images/default-profile-image.jpg";
import { useSelector } from "react-redux";

const MessageItem = ({
                         messageId,
                         date,
                         profileImageURL,
                         username,
                         text,
                         isAuthor,
                         updateMessage,
                         removeMessage
                     }) => {
    const userId = useSelector(state => state["currentUser"].user.id)
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
                    {isAuthor && (
                        <Link
                            to={{
                                pathname: `/users/${userId}/messages/edit`,
                                state: {
                                    userId,
                                    messageId
                                }
                            }}
                        >
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className='btn btn-primary btn-sm' onClick={updateMessage}>
                                edit
                            </a>
                        </Link>
                    )}
                    {isAuthor && (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a className='btn btn-danger btn-sm' onClick={removeMessage}>
                            delete
                        </a>
                    )}
                </div>
            </li>
        </div>
    );
};

MessageItem.propTypes = {
    messageId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string,
    isAuthor: PropTypes.bool.isRequired,
    updateMessage: PropTypes.func,
    removeMessage: PropTypes.func
};

export default MessageItem;
