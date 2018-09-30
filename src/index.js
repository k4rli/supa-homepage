import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './serviceworkers';

import './css/index.css';
import App from './App';
import Store from './store';
import { saveState } from './localstorage';

const storeInstance = Store();

storeInstance.subscribe(() => {
    saveState(
        storeInstance.getState()
    );
});

/* eslint-disable react/jsx-filename-extension */
const element = (
    <Provider store={storeInstance}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
/* eslint-enable react/jsx-filename-extension */
const container = document.getElementById('root');

ReactDOM.render(element, container);

registerServiceWorker();
