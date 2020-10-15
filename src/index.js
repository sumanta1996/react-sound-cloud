import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import musicDataReducer from './store/musicData-reducer';

const rootReducer = combineReducers({
    music: musicDataReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers());

const app = (
    <Provider store={store}>
        <App />
    </Provider>);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
