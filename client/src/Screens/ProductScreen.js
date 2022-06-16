import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../redux/cart'
import { fetchSingleProduct } from '../redux/singleProduct'
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Form,
  ListGroupItem,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Cookies from 'js-cookie'
import axios from 'axios'

function ProductScreen() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [msg, setMsg] = useState('')

  const { id } = useParams()

  const { product, status, error } = useSelector((state) => state.product)
  const { cart } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleClick = () => {
    const payload = {
      ...product,
      qty,
    }
    dispatch(addToCart(payload))

    navigate(`/cart`)
  }

  const submitHandle = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/products/reviews/${id}`, {
        rating,
        comment,
      })
      window.location.reload()
    } catch (error) {
      setMsg(error)
    }
  }
  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch, id])
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {status === 'error' && (
        <Message variant="danger" msg={error}>
          {error}
        </Message>
      )}
      {status === 'loading' && <Loader />}
      {status === 'success' && (
        <>
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} style={{ marginLeft: '3rem' }}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}{' '}
                                </option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="mx-auto">
                    <Button
                      onClick={handleClick}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="flush" msg="No reviews" />
              )}
              <ListGroup variant="primary">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review?</h2>
                  {msg && <Message varaint="danger" msg={msg} />}
                  {Cookies.get('JWT') ? (
                    <Form onSubmit={submitHandle}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1-Poor</option>
                          <option value="2">2-Fair</option>
                          <option value="3">3-Average</option>
                          <option value="4">4-Good</option>
                          <option value="5">5-Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" className="my-2" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message
                      variant="flush"
                      msg={`Please 
                       Login
                       to write`}
                    />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default ProductScreen
