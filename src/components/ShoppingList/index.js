import React, { Component } from 'react';
import uuid from 'uuid';

class ShoppingList extends Component {
    state = {
        items: [
            { id: uuid(), name: 'Eggs' },
            { id: uuid(), name: 'Milk' },
            { id: uuid(), name: 'Steak' },
            { id: uuid(), name: 'Water' },
        ]
    }
    render() {
        const { items } = this.state;
        const ListItems = items && items.length > 0 &&
            (
                <ul className="list-group">
                    {
                        items.map(({ id, name }) => (
                            <li className="list-group-item clearfix" key={id}>
                                <span className="float-left">{name}</span>
                                <button
                                    className="btn btn-danger float-right"
                                    onClick={()=>{
                                        this.setState(state=>({
                                            items: state.items.filter(item=> item.id !== id)
                                        }))
                                    }}
                                >
                                    &times;
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        console.log(items);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button
                            className="btn btn-dark mt-2 mb-2"
                            onClick={() => {
                                const name = prompt('Enter Item');
                                if (name) {
                                    this.setState(state => ({
                                        items: [...state.items, { id: uuid(), name }]
                                    }))
                                }
                            }}
                        >
                            Add Item
                        </button>
                    </div>
                    <div className="col-12">
                        {ListItems}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShoppingList;