import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
} from 'reactstrap'
class Register extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    toggle = () => {
        //clear errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        })
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if (error !== prevProps.error) {
            //check register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({
                    msg: error.msg.msg
                })
            } else {
                this.setState({ msg: null })
            }
        }
        //if authenticated, close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const newUser = {
            name,
            email,
            password
        }
        this.props.register(newUser);

        //close modal
        // this.toggle()
    }
    render() {
        return (
            <Fragment>
                <NavLink href="#"
                    color="dark"                    
                    onClick={this.toggle}
                >Register</NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mb-3"
                                    placeholder="Enter you name"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    placeholder="Enter you email"
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-3"
                                    placeholder="Enter you password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button color="dark" size="block">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.errorReducer
})

export default connect(
    mapStateToProps,
    { register,clearErrors }
)(Register);