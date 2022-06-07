import React, { useEffect, useRef } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import Cookies from 'js-cookie'

function EditUserScreen() {
  const { id } = useParams()
  const navigate = useNavigate()

  const name = useRef('')
  const email = useRef('')
  const [role, setRole] = React.useState('')
  const [singleUser, setSingleUser] = React.useState({})

  const { userList, status, error } = useSelector((state) => state.userList)
  const { user } = useSelector((state) => state.user)

  const submitHandle = async (e) => {
    e.preventDefault()
    const { data } = await axios.put(`/user/${singleUser._id}`, {
      name: name.current.value,
      email: email.current.value,
      role: role,
    })
    navigate('/admin/all-users/')
  }
  useEffect(() => {
    const userDetails = async () => {
      const { data } = await axios.get(`/user/${id}`)
      setSingleUser(data)
    }
    userDetails()
  }, [userList])
  return (
    <div>
      {!Cookies.get('JWT') && user.role !== 'Admin' && <Navigate to="/" />}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mt-2 text-center">Update User</h1>
            <Form onSubmit={submitHandle}>
              <Form.Group controlId="name">
                <Form.Label className="mt-2">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter name"
                  ref={name}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="mt-2">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter email"
                  ref={email}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="role">
                <Form.Label as="legend" className="h4 mt-5 mb-3 ">
                  Role:
                </Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="User"
                    id="user"
                    name="user-role"
                    value="User"
                    onChange={() => setRole('User')}
                  ></Form.Check>

                  <Form.Check
                    type="radio"
                    label="Admin"
                    id="admin"
                    name="admin-role"
                    value="Admin"
                    onChange={(e) => setRole('Admin')}
                  ></Form.Check>
                </Col>
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditUserScreen
