import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'

import '../styles/Data.css'
import { getData } from '../redux/actions'
import url from '../server'

export class Data extends Component {

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.token !== prevProps.token) {
      this.props.getData(`${url}/api/data`, { 'Authorization': this.props.token})
    }
  }

  render() {
    return (
      <Container className="data-container" fluid>
        Test Data!
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth ? state.auth.token : null
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    getData: (url, headers) => dispatch(getData(url, headers)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Data)