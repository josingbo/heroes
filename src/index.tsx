import { createBrowserHistory } from 'history';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';

import 'typeface-ibm-plex-sans';
import './styles';

const history = createBrowserHistory();

const initialState = window.initialReduxState;

const store = configureStore(history, initialState);

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
