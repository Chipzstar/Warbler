import React, { Component } from "react";
import PropTypes from "prop-types";

class AuthForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageURL: "",
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? "register" : "login";
        this.props
            .onAuth(authType, this.state)
            .then(() => alert("User Logged In!"))
            .catch(err => console.log(err));
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const {
            signUp,
            buttonText,
            heading,
            errors,
            history,
            removeError,
        } = this.props;

        history.listen(() => removeError());

        const { email, username, password, profileImageURL } = this.state;
        return (
            <div>
                <div className={"row justify-content-md-center text-center"}>
                    <div className={"col-md-6"}>
                        <form action='' onSubmit={this.handleSubmit}>
                            {errors.message && (
                                <div className='alert alert-danger'>
                                    {errors.message}
                                </div>
                            )}
                            <h2>{heading}</h2>
                            <label htmlFor='email'>Email:</label>
                            <input
                                className={"form-control"}
                                type='text'
                                id={"email"}
                                name={"email"}
                                onChange={this.handleChange}
                                value={email}
                            />
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='password'
                                name={"password"}
                                id={"password"}
                                className={"form-control"}
                                onChange={this.handleChange}
                                value={password}
                            />
                            {signUp && (
                                <div>
                                    <label htmlFor='username'>Username:</label>
                                    <input
                                        className={"form-control"}
                                        type='text'
                                        id={"username"}
                                        name={"username"}
                                        onChange={this.handleChange}
                                        value={username}
                                    />
                                    <label htmlFor='profileImageURL'>
                                        Image URL:
                                    </label>
                                    <input
                                        className={"form-control"}
                                        type={"text"}
                                        name={"profileImageURL"}
                                        id={"image-url"}
                                        onChange={this.handleChange}
                                        value={profileImageURL}
                                    />
                                </div>
                            )}
                            <br />
                            <br />
                            <button
                                type={"submit"}
                                className='btn btn-primary btn-block btn-lg'
                            >
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AuthForm.propTypes = {
    signUp: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    onAuth: PropTypes.func,
    errors: PropTypes.object,
    removeError: PropTypes.func,
};

export default AuthForm;
