import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

import { Route } from 'react-router'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker';
import store, { history } from './redux/store'

ReactDOM.render(
<Provider store={store}>
    <Router history={history}>
        <Route component={App} />
    </Router>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
