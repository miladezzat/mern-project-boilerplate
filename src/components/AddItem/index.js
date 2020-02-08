import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addItem } from '../../actions/itemActions';
import uuid from 'uuid';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
class AddItem extends Component {
    static propTypes = {
        addItem: PropTypes.func.isRequired,
        itemReducer: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    state = {
        modal: false,
        name: '',
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            id: uuid(),
            name: this.state.name
        }

        // Add item via addItem action
        this.props.addItem(newItem);
        //close modal
        this.toggle()
    }
    render() {
        return (
            <div className="col-12 mt-3">
                {
                    this.props.isAuthenticated
                        ?
                        (
                            <Button
                                color="dark"
                                className="mb-2"
                                onClick={this.toggle}
                            >Add Item</Button>
                        )
                        :
                        (
                            <h1>Please Log in to Manage you items</h1>
                        )
                }
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add Shopping Item"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button color="dark" size="block">Add Item</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    itemReducer: state.itemReducer,
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(AddItem);