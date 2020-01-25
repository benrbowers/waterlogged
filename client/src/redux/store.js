import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import thunk from 'redux-thunk'

import auth from './reducers/auth'
import data from './reducers/data'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

const router = routerMiddleware(history)
const enhancers = compose(
    applyMiddleware(thunk, router),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)


const rootReducer = combineReducers({ auth, data, router: connectRouter(history) })

const store = createStore(rootReducer, {}, enhancers)

if(module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default
        store.replaceReducer(nextRootReducer)
    })
}

export default store