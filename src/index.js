import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import "bootstrap/dist/css/bootstrap.min.css"
import logger from 'redux-logger'

import reducers from './reducers'
import App from './components/App'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const data_store = createStore(reducers, composeEnhancers(applyMiddleware(logger,thunk)))

ReactDOM.render(
    <Provider store = {data_store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)