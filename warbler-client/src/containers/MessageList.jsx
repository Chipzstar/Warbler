import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchMessages();
        console.log(this.props.messages);
    }

    render() {
        const { messages } = this.props;
        const messageList = messages.map((msg, index) => {
            console.log(msg);
            return (
                <MessageItem
                    key={msg._id}
                    text={msg.text}
                    date={msg.createdAt}
                    username={msg.user.username}
                    profileImageURL={msg.user.profileImageURL}
                />
            );
        });
        return <div>{messageList}</div>;
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages,
    };
};

export default connect(mapStateToProps, { fetchMessages })(MessageList);
