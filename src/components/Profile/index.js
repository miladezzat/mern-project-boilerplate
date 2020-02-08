import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/items" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>welcome to profile</h1>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default compose(connect(mapStateToProps, null))(Profile);