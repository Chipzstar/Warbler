import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMessage, fetchMessages } from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchMessages();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        for (let msg of this.props.messages) console.log(msg);
        console.log(this.props.currentUser.user);
    }

    render() {
        const { currentUser, messages, deleteMessage } = this.props;
        const messageList = messages.map((msg, index) => {
            let isAuthor = currentUser.user.id === msg.user["_id"];
            let inputProps = {
                key: msg["_id"],
                text: msg.text,
                date: msg["createdAt"],
                username: msg.user.username,
                profileImageURL: msg.user.profileImageURL,
                removeMessage: isAuthor
                    ? deleteMessage.bind(this, msg.user._id, msg._id)
                    : null,
            };
            return <MessageItem {...inputProps} />;
        });
        return (
            <div className='row col-sm-10'>
                <div className='offset-1 col-sm-10'>
                    <ul className='list-group' id='messages'>
                        {messageList}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        messages: state.messages,
    };
};

export default connect(mapStateToProps, { fetchMessages, deleteMessage })(
    MessageList
);
