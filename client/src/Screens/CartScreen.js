import React, { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCart, clearCart } from "../redux/cart";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";

function CartScreen() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkOutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="text-center my-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <Message variant="danger" msg="Your cart is Empty">
            <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={3}>
                    <Image
                      src={item.image}
                      style={{ width: "150px" }}
                      alt={item.name}
                      fluid
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹ {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(updateCart({ ...item, qty: e.target.value }));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}{" "}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="white"
                      onClick={(e) => dispatch(removeFromCart(item))}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="my-5">
        <ListGroup variant="success">
          <ListGroup.Item>
            <h3>
              Subtotal ({cart.reduce((a, c) => Number(a) + Number(c.qty), 0)})
              items
            </h3>
            ₹{" "}
            {cart.reduce(
              (a, c) => Number(a) + Number(c.price) * Number(c.qty),
              0
            )}
            <ListGroup.Item className="mx-auto" style={{ border: "none" }}>
              <Button
                type="button"
                // className="btn-block"
                disable={cart.length === 0}
                onClick={checkOutHandler}
              >
                Proceed{" "}
              </Button>
              <Button
                type="button"
                className="mx-1"
                disable={cart.length === 0}
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </ListGroup.Item>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}

export default CartScreen;
