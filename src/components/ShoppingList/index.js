import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../../actions/itemActions'
import PropTypes from 'prop-types';

class ShoppingList extends Component {
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
                        items.map(({ id, name }) => (
                            <li className="list-group-item clearfix" key={id}>
                                <span className="float-left">{name}</span>
                                <button
                                    className="btn btn-danger float-right"
                                    onClick={() => { this.onDeleteClick(id) }}
                                >
                                    &times;
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5">
                        {ListItems}
                    </div>
                </div>
            </div>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    itemReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    itemReducer: state.itemReducer
})


export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);