import React, { Component, Fragment } from 'react'
import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink,
         InputGroup, InputGroupAddon,
         Input, Collapse, 
         NavbarToggler, Col } from 'reactstrap'

import '../styles/Header.css'
import Logo from '../img/logo-small.png'
import { auth } from '../firebase'
import { history } from '../redux/store'

class Header extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { accountID } = this.props
    return (
    <Navbar className="navbar" dark expand="md">
        <NavbarBrand className="waterlogged-brand"><img className="small-logo" src={Logo} alt="" /></NavbarBrand>
        <Nav className="mr-auto" navbar>
        <NavItem>
            <NavLink id="navlink" href="/data">Your Data</NavLink>
        </NavItem>
        <NavItem>
            <NavLink id="navlink" href="/pair">Pair a Tracker</NavLink>
        </NavItem> 
    </Nav>
        <Nav className="ml-auto" navbar>
        <NavItem>
            <Button color="secondary" className="logout-btn" onClick={auth.logOut}>Log Out</Button>
        </NavItem>
        </Nav>
    </Navbar>
    )
  }
}

export default Header