import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewMessage } from "../store/actions/messages";

class MessageForm extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
        };
    }
    handleNewMessage = e => {
        e.preventDefault();
        this.props.createNewMessage(this.state.message);
        this.setState({ message: "" });
        this.props.history.push("/");
    };
    render() {
        const { message } = this.state;
        const { errors } = this.props;
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
                    <button
                        type='submit'
                        className='btn btn-success btn-lg pull-right'
                    >
                        Add my message
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors,
    };
};

export default connect(mapStateToProps, { createNewMessage })(MessageForm);
