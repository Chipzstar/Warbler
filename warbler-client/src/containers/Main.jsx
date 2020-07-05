import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "./MessageForm";

const Main = ({ authUser, errors, removeError, currentUser }) => {
    return (
        <div className={"container"}>
            <Switch>
                <Route
                    exact={true}
                    path='/'
                    render={props => (
                        <Homepage currentUser={currentUser} {...props} />
                    )}
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
                                buttonText={"Register"}
                                heading={"Join Warbler today!"}
                                {...props}
                            />
                        );
                    }}
                />
                <Route
                    path='/users/:id/messages/new'
                    component={withAuth(MessageForm)}
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
