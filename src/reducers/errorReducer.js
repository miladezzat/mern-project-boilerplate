import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';
const initialState = {
    msg: {},
    status:'',
    id: ''
}

export default function (state = initialState, action) {
    switch (action) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.is
            };
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
}