import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { addTracker } from '../redux/actions'
import url from '../server'

import '../styles/PairTracker.css'

export class PairTracker extends Component {

  handleSubmit = (ev) => {
    ev.preventDefault()

    let mac = ev.target.mac.value
    let appliance = ev.target.appliance.value

    this.props.addTracker(`${url}/api/tracker`, { 'Content-Type': 'application/json', 'Authorization': this.props.token }, JSON.stringify({
      tracker: {
        mac,
        appliance
      },
      token: this.props.token
    }))
  }

  render() {
    // TODO: Flesh out add form
    return (
      <Container className="pair-tracker-container" fluid>
        <h1 id="header">Add a Tracker</h1>
        <form onSubmit={this.handleSubmit}>
          MAC Address:
          <input name="mac" type="text" />
          Appliance:
          <select name="appliance">
            <option value="Kitchen Faucet">Kitchen Faucet</option>
            <option value="Showerhead">Showerhead</option>
            <option value="Dishwasher">Dishwasher</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Bathtub Faucet">Bathtub Faucet</option>
          </select> 
          <Button className="tracker-btn" type="submit" >Add</Button>
        </form>
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
    addTracker: (url, headers, body) => dispatch(addTracker(url, headers, body)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PairTracker)