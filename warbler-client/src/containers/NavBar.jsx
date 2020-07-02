import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../assets/images/warbler-logo.png";
class NavBar extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            <img src={Logo} alt='Warbler Home' />
                        </Link>
                    </div>
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <Link to='/register'>Sign Up</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
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

export default connect(mapStateToProps, null)(NavBar);
