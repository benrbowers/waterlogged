import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'

import '../styles/Login.css'
import Logo from '../img/logo.png'
import { auth, googleProvider } from '../firebase'
import { setToken } from '../redux/actions'
//import url from '../server.js'

export class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: '',
    }
  }

  logInWithGoogle = () => {
    auth.signInWithGoogle(googleProvider)
      /*.then((response) => {
          const name = response.user.displayName.split(' ')
          response.user.getIdToken(true)
          .then((token) => {
            this.props.register(`${url}/register?first=${name[0]}&last=${name[1]}`, { 'X-Authorization-Firebase': token})
          })
      })*/
      .catch(error => {
        this.setState({ error })
      })
  }


  render() {
    return (
      <Container className="login-container" fluid>
        <h1 id="slogan">Know where it goes.</h1>
        <Row>
          <Col className="logo" md={{ size: 4 }}>
            <img src={Logo} alt="" />
          </Col>
        </Row>

            <Button type="button" className="google-btn" color="primary" size="lg" block onClick={this.logInWithGoogle}><span className="fa fa-google g-icon"></span>Log In With Google</Button>
            { this.state.error && <p>{this.state.error.message}</p> }
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)