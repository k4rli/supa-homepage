import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/RootReducer';
import { loadState } from '../localstorage';

export default function store() {
    if (process.env.NODE_ENV === 'development') {
        return createStore(
            rootReducer,
            loadState(),
            composeWithDevTools(applyMiddleware(thunk)),
        );
    }
    return createStore(
        rootReducer,
        loadState(),
    );
}
