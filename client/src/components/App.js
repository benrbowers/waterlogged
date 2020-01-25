import React, { Component }  from 'react';
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'
import { logIn, logOut, setToken } from '../redux/actions'

import { firebase } from '../firebase'
import '../styles/App.css';

import Login from './Login'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      error: '',
      isLoading: true,
    }
  }

  componentDidMount() {
    firebase.onAuthStateChanged(authUser => {
      if(authUser) {
        this.props.logIn(authUser)
        authUser.getIdToken(true)
          .then((token) => {
            this.props.setToken(token)
            //TODO: Get data; this.props.getProfile(`${url}/api/getProfile?username=${authUser.uid}&type=user`, { 'X-Authorization-Firebase': token})
          })
      } else {
        this.props.logOut(authUser)
      }
      this.setState({ isLoading: false })
    })
  }

  loggedIn = () => {
    return this.props.loggedIn
  }

  render = () => {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    account: state.auth.data ? state.auth.data : null,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    logIn: (user) => dispatch(logIn(user)),
    logOut: () => dispatch(logOut()),
    setToken: (token) => dispatch(setToken(token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)