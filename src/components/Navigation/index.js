import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from '../auth/RegiterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
class Navigation extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        console.log('====================================');
        console.log(this.props);
        console.log('====================================');
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Boilerplate</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {
                            isAuthenticated ? <NavigationAuth />
                                : <NavigationNonAuth />
                        }
                    </ul>

                </div>
            </nav>
        )
    }
}

const NavigationAuth = () => (
    <Fragment>
        <li className="nav-item">
            <Logout />
        </li>
    </Fragment>
);

const NavigationNonAuth = () => (
    <Fragment>
        <li className="nav-item active">
            <RegisterModal />
        </li>
        <li className="nav-item">
            <LoginModal />
        </li>
    </Fragment>
)

const mapStateToProps = (state) => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, null)(Navigation)