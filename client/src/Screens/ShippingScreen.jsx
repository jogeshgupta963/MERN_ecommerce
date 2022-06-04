import React, { useState, useRef } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../redux/cart'
import Cookies from 'js-cookie'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

function ShippingScreen() {
  const address = useRef('')
  const city = useRef('')
  const country = useRef('')
  const postalCode = useRef(0)
  const [error, setError] = useState(-1)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandle = (e) => {
    e.preventDefault()

    if (
      address.current.value === '' ||
      city.current.value === '' ||
      country.current.value === '' ||
      postalCode.current.value === ''
    ) {
      setError(0)
      return
    }

    const shippingDetails = {
      address: address.current.value,
      city: city.current.value,
      country: country.current.value,
      postalCode: postalCode.current.value,
    }
    dispatch(saveShippingAddress(shippingDetails))
    navigate('/payment')
  }

  return (
    <>
      {!Cookies.get('JWT') && <Navigate to="/login?redirect=shipping " />}
      <CheckoutSteps step1 step2 />
      <Container as="div" style={{ maxWidth: '50%' }} className="mx-auto">
        <h1 className="text-center pt-2">Shipping Address</h1>
        {error === 0 && (
          <Message variant="danger" msg="Please fill all fields" />
        )}
        <Form>
          <Form.Group controlId="address">
            <Form.Label className="p-2">Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              ref={address}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label className="p-2">City:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              ref={city}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postal code">
            <Form.Label className="p-2">Postal Code:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter pin"
              ref={postalCode}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label className="p-2">Country:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter pin"
              ref={country}
            ></Form.Control>
          </Form.Group>

          <Button
            className="mt-2 ml-5"
            variant="primary"
            onClick={submitHandle}
          >
            Continue
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default ShippingScreen
