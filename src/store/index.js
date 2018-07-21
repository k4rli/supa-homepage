import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/RootReducer';
import { loadState } from "../localstorage";

export default function store() {
    return createStore(
        rootReducer, 
        loadState(),
        composeWithDevTools(applyMiddleware(thunk)),
    );
}
