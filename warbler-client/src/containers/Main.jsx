import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";

const Main = ({ authUser, errors, removeError }) => {
    return (
        <div className={"container"}>
            <Switch>
                <Route
                    exact={true}
                    path='/'
                    render={props => <Homepage {...props} />}
                />
                <Route
                    exact={true}
                    path='/login'
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                errors={errors}
                                onAuth={authUser}
                                buttonText={"Log In"}
                                heading={"Welcome Back!"}
                                {...props}
                            />
                        );
                    }}
                />
                <Route
                    exact={true}
                    path='/register'
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                errors={errors}
                                onAuth={authUser}
                                signUp
                                buttonText={"Registration"}
                                heading={"Join Warbler today!"}
                                {...props}
                            />
                        );
                    }}
                />
            </Switch>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
    };
};
export default withRouter(
    connect(mapStateToProps, { authUser, removeError })(Main)
);
