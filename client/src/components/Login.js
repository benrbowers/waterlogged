import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'

import '../styles/Login.css'
import Logo from '../img/logo.jpeg'
//import { auth, facebookProvider } from '../firebase'
//import { registerUser } from '../redux/actions'
//import url from '../server.js'

export class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: '',
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

   /* auth.logInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error })
      })*/
  }

 /* logInWithFacebook = () => {
    auth.signInWithFacebook(facebookProvider)
      .then((response) => {
          const name = response.user.displayName.split(' ')
          response.user.getIdToken(true)
          .then((token) => {
            this.props.register(`${url}/register?first=${name[0]}&last=${name[1]}`, { 'X-Authorization-Firebase': token})
          })
      })
      .catch(error => {
        this.setState({ error })
      })
  }*/

  logInWithGoogle = () => {

  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="logo" md={{ size: 4, offset:4}}>
            <img src={Logo} alt="" />
          </Col>
        </Row>

        <div className="Login form-signin">
            <form onSubmit={this.handleSubmit}>
                <div className="fb-container">
                    <button type="button" className="btn btn-lg btn-block btn-social btn-facebook"
                    onClick={this.logInWithGoogle}>
                    <i className="fab fa-facebook-f fa-fw"></i> Log in with Google
                    </button>
                </div>

                { this.state.error && <p>{this.state.error.message}</p> }
            </form>
        </div>
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
    //register: (url, headers) => dispatch(registerUser(url, headers)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)