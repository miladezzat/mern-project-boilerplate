import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from '../auth/RegiterModal';
import Logout from '../auth/Logout'
class Navigation extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Boilerplate</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <RegisterModal />
                        </li>
                        <li className="nav-item">
                            <Logout />
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}
export default Navigation;