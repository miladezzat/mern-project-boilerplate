import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../../actions/itemActions'
import PropTypes from 'prop-types';
import AddItem from '../AddItem';

class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        itemReducer: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.props.getItems();
    }
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
    render() {
        const { items } = this.props.itemReducer;
        const ListItems = items && items.length > 0 &&
            (
                <ul className="list-group ">
                    {
                        items.map(({ _id, name }) => (
                            <li className="list-group-item clearfix" key={_id}>
                                <span className="float-left">{name}</span>
                                {
                                    this.props.isAuthenticated
                                        ?
                                        (
                                            <button
                                                className="btn btn-danger float-right"
                                                onClick={() => { this.onDeleteClick(_id) }}
                                            >&times;</button>
                                        )
                                        :
                                        (
                                            null
                                        )
                                }
                            </li>
                        ))
                    }
                </ul>
            )
        return (
            <div className="container">
                <div className="row">
                    <AddItem />
                    <div className="col-12 mt-5">
                        {ListItems}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    itemReducer: state.itemReducer,
    isAuthenticated: state.authReducer.isAuthenticated
})


export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);