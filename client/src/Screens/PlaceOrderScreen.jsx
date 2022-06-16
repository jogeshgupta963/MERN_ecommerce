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
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { createOrder } from '../redux/order.js'

function PlaceOrderScreen() {
  //global states
  const { cart, shipping, payment } = useSelector((state) => state.cart)
  const { order, status, error } = useSelector((state) => state.order)

  //   calculate the total price of the cart
  const itemPrice = cart.reduce((total, product) => {
    return total + product.price * product.qty
  }, 0)

  const taxPrice = Number(itemPrice * 0.18).toFixed(2)

  const shippingPrice = (itemPrice * 0.01).toFixed(2)

  const totalPrice = itemPrice + taxPrice + shippingPrice

  //   hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //handlers
  const placeOrderHandle = (e) => {
    e.preventDefault()

    const orderItems = cart.map((item) => {
      return {
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      }
    })

    dispatch(
      createOrder({
        orderItems,
        shippingAddress: shipping,
        paymentMethod: payment,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }),
    )
    navigate(`/order/${order._id}`)
  }

  useEffect(() => {
    // eslint - disable - next - line
    if (status === 'success') {
      navigate(`/order/${order._id}`)
    }
  }, [dispatch, navigate, status, order._id])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="text-center">Shipping</h3>
              <div>
                <h4>Address:</h4>
                <span className="mx-3">{shipping.address}</span>
                <br />
                <span className="mx-3">{shipping.city}</span>
                <br />
                <span className="mx-3">{shipping.country}</span>
                <br />
                <span className="mx-3">{shipping.postalCode}</span>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className="text-center">Payment</h3>
              <h4>Method:</h4>
              <span className="mx-3">{payment}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className="text-center">Cart Items</h3>
              {cart.length === 0 ? (
                <Message variant="danger" msg="Cart is empty" />
              ) : (
                <ListGroup variant="flush">
                  {cart.map((item) => (
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
                          <h5>
                            <Link
                              style={{
                                textDecoration: 'none',
                              }}
                              to={`/product/${item._id}`}
                            >
                              {item.name}
                            </Link>
                          </h5>
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
                          {item.price} x {item.qty} = ₹{item.price * item.qty}
                        </Col>
                        {/* </Col> */}
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
                    <Col>{itemPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup.Item>

              <ListGroup.Item>
                {status === 'error' && <Message variant="danger" msg={error} />}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="mx-auto"
                  disabled={cart.length === 0 ? true : false}
                  onClick={placeOrderHandle}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
