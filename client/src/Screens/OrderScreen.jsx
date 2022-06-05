import React, { useEffect } from 'react'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails } from '../redux/orderDetails.js'
import Loader from '../components/Loader'
import axios from 'axios'

function OrderScreen() {
  //global states

  const { orderDetails, status, error } = useSelector(
    (state) => state.orderDetails,
  )

  //   hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  //handlers

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [])
  console.log(orderDetails)
  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      {status === 'loading' && <Loader />}
      {status === 'error' && <Message variant="danger">{error}</Message>}
      {status === 'success' && (
        <div>
          <h1>Order {orderDetails._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 className="text-center">Shipping</h3>
                  <div>
                    <h4>Address:</h4>
                    {orderDetails.isDelivered ? (
                      <Message
                        variant="success"
                        msg={`Delivered at ${orderDetails.deliveredAt}`}
                      />
                    ) : (
                      <Message variant="warning" msg="Not yet delivered" />
                    )}
                    <span className="mx-3">
                      {orderDetails.shippingAddress.address}
                    </span>
                    <br />
                    <span className="mx-3">
                      {orderDetails.shippingAddress.city}
                    </span>
                    <br />
                    <span className="mx-3">
                      {orderDetails.shippingAddress.country}
                    </span>
                    <br />
                    <span className="mx-3">
                      {orderDetails.shippingAddress.postalCode}
                    </span>
                  </div>
                  <div>
                    <h4>User Details</h4>
                    <span className="mx-3">
                      username : {orderDetails.user.name}
                    </span>
                    <br />
                    <span className="mx-3">
                      <a href={`mailto:${orderDetails.user.email}`}>
                        {orderDetails.user.email}
                      </a>
                      {/* email : {orderDetails.user.email} */}
                    </span>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3 className="text-center">Payment</h3>
                  <span className="mx-3">
                    {orderDetails.isPaid}
                    {orderDetails.isPaid ? (
                      <Message
                        variant="success"
                        msg={`paid successfully on ${orderDetails.paidAt} `}
                      />
                    ) : (
                      <Message variant="warning" msg="Not yet paid" />
                    )}
                  </span>
                  <h4>Method:</h4>
                  <span className="mx-3">{orderDetails.paymentMethod}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3 className="text-center">Order Items</h3>
                  {orderDetails.orderItems.length === 0 ? (
                    <Message variant="danger" msg="Cart is empty" />
                  ) : (
                    <ListGroup variant="flush">
                      {orderDetails.orderItems.map((item) => (
                        <ListGroup.Item key={item.id}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                style={{ maxHeight: '15vh' }}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col md={3}>
                              <div>
                                <Link
                                  style={{
                                    textDecoration: 'none',
                                  }}
                                  to={`/product/${item._id}`}
                                >
                                  {item.name}
                                </Link>
                              </div>
                            </Col>
                            <Col>
                              <strong
                                style={{ fontSize: '15px', fontWeight: 'bold' }}
                              >
                                Quantity:{' '}
                              </strong>
                              {item.qty}
                            </Col>

                            <Col>
                              <strong
                                style={{ fontSize: '15px', fontWeight: 'bold' }}
                              >
                                Price:{' '}
                              </strong>
                              {item.price} x {item.qty} = ₹
                              {item.price * item.qty}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3 className="text-center">Order Summary</h3>

                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>₹{orderDetails.itemPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>₹{orderDetails.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>₹{orderDetails.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>₹{orderDetails.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default OrderScreen
