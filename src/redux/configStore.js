import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from "redux-thunk";

export default function configStore(initialState) {
    const enhancerCompose = window.__REDUX_DEVTOOLs_EXTENSION_COMPOSE__ || compose;

    return createStore(rootReducer, initialState, 
        enhancerCompose(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}