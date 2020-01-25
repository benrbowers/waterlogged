import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'

import '../styles/Main.css'
import Header from './Header'
import Data from './Data'
import PairTracker from './PairTracker'

export class Main extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="main-container">
          <Header />
          <Switch>
            <Route path="/data" render={(navProps) => <Data {...navProps} />}/>
            <Route path="/pair" render={(navProps) => <PairTracker {...navProps} />}/>
            <Route path='/' render={(navProps) => <Redirect to="/data" />}/>
          </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
    //token: state.auth.token,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    //setToken: (url, headers) => dispatch(registerUser(url, headers)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)