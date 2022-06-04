import React, { useState, useRef } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../redux/cart'
import Message from '../components/Message'

function PaymentScreen() {
  const { shipping, payment } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  if (!shipping) {
    navigate('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState()
  const [err, setErr] = useState(-1)
  const dispatch = useDispatch()

  const submitHandle = (e) => {
    e.preventDefault()

    if (!paymentMethod) {
      setErr(0)
      return
    }
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/place-order')
  }

  return (
    <>
      {!Cookies.get('JWT') && <Navigate to="/login?redirect=shipping " />}
      <CheckoutSteps step1 step2 step3 />
      <Container as="div" style={{ maxWidth: '50%' }} className="mx-auto">
        <h1 className="text-center pt-2">Payment Method</h1>
        {err === 0 && (
          <Message variant="danger" msg="Please select a payment method" />
        )}
        <Form>
          <Form.Group controlId="">
            <Form.Label as="legend" className="h3 mt-5 mb-3 ">
              Select Method:
            </Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="Credit Card "
                id="creditcard"
                name="payment-method"
                value="Credit Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type="radio"
                label="PayPal "
                id="paypal"
                name="payment-method"
                value="Paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type="radio"
                label="Google Pay"
                id="gpay"
                name="payment-method"
                value="Google Pay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type="radio"
                label="Debit Card"
                id="gpay"
                name="payment-method"
                value="Debit Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button
            className="mt-2 ml-5 rounded"
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

export default PaymentScreen
