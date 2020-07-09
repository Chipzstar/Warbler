import React, { Component } from "react";
import PropTypes from "prop-types";

class AuthForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            username: "",
            password: "",
        };
    }

    mapStateToFormData = () => {
        let form_data = new FormData();
        Object.keys(this.state).forEach(item => {
            item !== "profileImageURL"
                ? form_data.set(item, this.state[item])
                : form_data.append(
                      item,
                      this.state[item],
                      this.state[item].name
                  );
        });
        return form_data;
    };

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? "register" : "login";
        console.log("AuthType:", authType);
        const formData = this.mapStateToFormData();
        this.props
            .onAuth(authType, formData)
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err));
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.files[0],
            },
            () => console.log(this.state.profileImageURL)
        );
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

        const { email, username, password } = this.state;
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
                                        type={"file"}
                                        name={"profileImageURL"}
                                        id={"image-url"}
                                        onChange={this.handleFileChange}
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
