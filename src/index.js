import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './serviceworkers';
import Store from './store';
import { saveState } from './localstorage';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const storeInstance = Store();

storeInstance.subscribe(() => {
    saveState(
        storeInstance.getState()
    );
});

ReactDOM.render((
    <Provider store={storeInstance}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

registerServiceWorker();
