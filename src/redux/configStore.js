import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configStore(initialState) {
    const enhancerCompose = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;

    return createStore(rootReducer, initialState, 
        enhancerCompose(applyMiddleware(reduxImmutableStateInvariant())));
}