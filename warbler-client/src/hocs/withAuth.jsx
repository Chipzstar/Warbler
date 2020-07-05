import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentDidMount() {
            if (this.props.isAuthenticated === false) {
                this.props.history.push("/login");
            }
        }
        componentDidUpdate(nextProps, nextState, nextContext) {
            if (nextProps.isAuthenticated === false) {
                this.props.history.push("/login");
            }
        }
        render() {
            return <ComponentToBeRendered {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.currentUser.isAuthenticated,
        };
    };

    return connect(mapStateToProps)(Authenticate);
}
