import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {userFetchURLReducer, FetchFilesReducer, saveUserReducer} from './src/reducers/userReducer'

const reducer = combineReducers({
    fetchedURL : userFetchURLReducer,
    fetchedFiles : FetchFilesReducer,
    userInfo : saveUserReducer,
})


const initialState = {

}


const store = createStore(reducer, initialState, applyMiddleware(thunk))

export default store
