import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// Return  Errors 

export const returnErrors = (msg , status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

//Clear Error
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}