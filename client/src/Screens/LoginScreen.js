import React, { useRef } from 'react'

import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Message from '../components/Message'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/user.js'

function LoginScreen() {
  const email = useRef('')
  const pass = useRef('')

  const [searchParams] = useSearchParams()

  const [msg, setMsg] = React.useState(-1)
  const dispatch = useDispatch()

  const submitHandle = async (e) => {
    e.preventDefault()
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/user/login', {
        email: email.current.value,
        password: pass.current.value,
      })
      dispatch(getUser(data))
      setMsg(1)
    } catch (error) {
      setMsg(0)
    }
  }

  return (
    <div>
      {Cookies.get('JWT') && (
        <Navigate
          to={
            searchParams.get('redirect')
              ? `/${searchParams.get('redirect')}`
              : '/'
          }
        />
      )}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mt-2 text-center">Log In</h1>
            {msg === 0 && (
              <Message variant="danger" msg="Invalid Username or password" />
            )}
            {msg === 1 && <Message variant="success" msg="Logged In" />}

            <Form onSubmit={submitHandle}>
              <Form.Group controlId="email">
                <Form.Label className="mt-2">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter email"
                  ref={email}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter password"
                  ref={pass}
                ></Form.Control>
              </Form.Group>
              <Row as="div">
                <Link
                  className="pt-2 pb-0"
                  style={{ textAlign: 'right' }}
                  to="/forgot-password"
                >
                  {' '}
                  Forgot Password
                </Link>
              </Row>
              <Button className="mt-3" type="submit" variant="primary">
                LogIn
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                New in here?<Link to="/register"> Signup here</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginScreen
