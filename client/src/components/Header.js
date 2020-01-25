import React, { Component } from 'react'
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
            <NavLink href="/data">Your Data</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/pair">Pair a Tracker</NavLink>
        </NavItem> 
    </Nav>
        <Nav className="ml-auto" navbar>
        <NavItem>
            <Button color="secondary" className="btn-sm" onClick={auth.logOut}>Log Out</Button>
        </NavItem>
        </Nav>
    </Navbar>
    )
  }
}

export default Header