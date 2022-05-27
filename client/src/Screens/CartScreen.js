import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cart";
import { Link, useParams } from "react-router-dom";
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

  return (
    <Row>
      <Col md={12}>
        <h1>Shopping Cart</h1>
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
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹ {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      // value={}
                      // onChange={(e) =>
                      // dispatch(addToCart(item._id, Number(e.target.value)))
                      // }
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
                      // onClick={() => removeFromCart(item._id)}
                    >
                      <i className="fas fa-trash"></i>{" "}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {/* <Col md={2}></Col>
      <Col md={2}></Col> */}
    </Row>
  );
}

export default CartScreen;
