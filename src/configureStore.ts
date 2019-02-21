// This provides a Redux middleware which connects to our `react-router` instance.
import { routerMiddleware } from 'connected-react-router';
// If you use react-router, don't forget to pass in your history type.
import { History } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// Import the state interface and our combined reducers/sagas.
import { ApplicationState, rootReducer, rootSaga } from './store';

export default function configureStore(
    history: History,
    initialState: ApplicationState
): Store<ApplicationState> {
    // create the composing function for all middleware
    const composeEnhancers = composeWithDevTools({});
    // create the redux-saga middleware
    const sagaMiddleware = createSagaMiddleware();

    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.

    const store = createStore(
        rootReducer(history),
        initialState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions (e.g. to change URL with push('/path/to/somewhere')).
                sagaMiddleware
            )
        )
    );

    // Don't forget to run the root saga, and return the store object.
    sagaMiddleware.run(rootSaga);
    return store;
}
