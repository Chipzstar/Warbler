import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewMessage, updateMessage } from "../store/actions/messages";

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    handleNewMessage = e => {
        e.preventDefault();
        const { history, location, match, createNewMessage, updateMessage } = this.props;
        switch (match.params.type) {
            case "new":
                createNewMessage(this.state.message)
                    .then(() => {
                        this.setState({ message: "" });
                        history.push("/");
                    })
                return
            case "edit":
                updateMessage(this.state.message, location.state["userId"], location.state["messageId"])
                    .then(() => {
                        this.setState({ message: "" });
                        history.push("/");
                    })
                return
            default:
                console.error("Invalid URL parameter!")
                return
        }
    };

    render() {
        const { message } = this.state;
        const { errors, match } = this.props;
        return (
            <div>
                <form onSubmit={this.handleNewMessage}>
                    {errors.message && (
                        <div className='alert alert-danger'>
                            {errors.message}
                        </div>
                    )}
                    <label htmlFor='message'>Enter your message here</label>
                    <input
                        type='text'
                        name={"message"}
                        className={"form-control"}
                        value={message}
                        onChange={e =>
                            this.setState({ message: e.target.value })
                        }
                    />
                    <br/><br/>
                    <button
                        type='submit'
                        className='btn btn-success btn-lg pull-right'
                    >
                        {match.params.type === "edit" ? "Update message": "Add my message"}
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors
    };
};

export default connect(mapStateToProps, { createNewMessage, updateMessage })(MessageForm);
