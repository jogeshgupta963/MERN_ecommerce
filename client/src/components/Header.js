import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../redux/user'
import axios from 'axios'
import SearchBox from './SearchBox'

function Header() {
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const logoutHandle = async () => {
    try {
      await axios.get('/user/logout')
      dispatch(removeUser())
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>jadooooo</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-5" style={{ marginLeft: 'auto' }}>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-2"></i>Cart
                </Nav.Link>
              </LinkContainer>

              {Cookies.get('JWT') ? (
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <i className="fas fa-user px-2"></i>
                    {user.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as="div">
                      <Link to="/profile"> Profile</Link>{' '}
                    </Dropdown.Item>

                    <Dropdown.Item as="div" onClick={logoutHandle}>
                      <Link to="/"> Logout</Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user px-2"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {user.role === 'Admin' && user && (
                // <Dropdown.Item as="div">
                //   <Link to="/all-users"> Users</Link>
                // </Dropdown.Item>
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <i className="fas fa-user px-2"></i>
                    Admin
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as="div">
                      <Link to="/admin/all-users">Users</Link>{' '}
                    </Dropdown.Item>

                    <Dropdown.Item as="div">
                      <Link to="/admin/all-products"> Products</Link>
                    </Dropdown.Item>

                    <Dropdown.Item as="div">
                      <Link to="/admin/all-orders">Orders</Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
