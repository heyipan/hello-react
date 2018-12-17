import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Navi from './Navi/Navi'
import MovieItem from './reudcer/movieReducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import * as serviceWorker from './serviceWorker';

const store = createStore(MovieItem);

ReactDOM.render(
    <Provider store={store}>
        <Navi />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
/*
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import './index.css'

const store = createStore(commentsReducer)

ReactDOM.render(
    <Provider store={store}>
        <CommentApp />
    </Provider>,
    document.getElementById('root')
);*/
