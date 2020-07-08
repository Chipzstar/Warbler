import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../assets/images/warbler-logo.png";
import { logout } from "../store/actions/auth";

class NavBar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    };

    render() {
        const { currentUser } = this.props;
        return (
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            <img src={Logo} alt='Warbler Home' />
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link
                                    to={`/users/${currentUser.user.id}/messages/new`}
                                >
                                    New Message
                                </Link>
                            </li>
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a onClick={this.logout}>Logout</a>
                            </li>
                        </ul>
                    ) : (
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to='/register'>Sign Up</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    };
};

/*const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    };
};*/

export default connect(mapStateToProps, { logout })(NavBar);
