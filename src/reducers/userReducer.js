import {
    FETCH_URL_LIST_FAIL,
    FETCH_URL_LIST_SUCCESS,
    FETCH_URL_LIST_REQUEST,

    
    FETCH_LIST_FILES_FAIL,
    FETCH_LIST_FILES_SUCCESS,
    FETCH_LIST_FILES_REQUEST,

    SAVE_USER_ID,

} from '../constants/FetchWithIdConstants'


export const userFetchURLReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_URL_LIST_REQUEST:
            return { loading : true }
        case FETCH_URL_LIST_SUCCESS:
            return { loading: false, userURL: action.payload }

        case FETCH_URL_LIST_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state
    }
}

export const saveUserReducer = (state = {}, action ) => {
    switch (action.type) {
        case SAVE_USER_ID:
            return { userID : action.payload}
        default:
            return state
    }
}



export const FetchFilesReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_LIST_FILES_REQUEST:
            return {loading : true}
        case FETCH_LIST_FILES_SUCCESS:
            return {loading: false, userFiles: action.payload}

        case FETCH_LIST_FILES_FAIL:
            return {loading: false, error: action.payload}

        default: 
            return state
    }
}