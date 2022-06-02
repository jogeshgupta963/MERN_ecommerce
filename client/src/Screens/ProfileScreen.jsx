import React, { useRef } from "react";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/user.js";

function ProfileScreen() {
  const { user } = useSelector((state) => state.user);

  const email = useRef("");
  const pass = useRef("");
  const oldPass = useRef("");
  const name = useRef("");

  const [msg, setMsg] = React.useState(-1);
  const dispatch = useDispatch();

  const [error, setError] = React.useState("");

  const submitHandle = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      if (
        (!pass.current.value && oldPass.current.value) ||
        (pass.current.value && !oldPass.current.value)
      ) {
        throw new Error("enter old and new passwords");
      }
      axios.defaults.withCredentials = true;
      const { data } = await axios.put("/user/profile", {
        name: name.current.value ? name.current.value : undefined,
        email: email.current.value ? email.current.value : undefined,
        oldPassword: oldPass.current.value ? oldPass.current.value : undefined,
        password: pass.current.value ? pass.current.value : undefined,
      });
      console.log(data);
      dispatch(getUser({ ...data }));
      setMsg(1);
    } catch (error) {
      setError(error.message);
      setMsg(0);
    }
  };
  return (
    <div>
      {!Cookies.get("JWT") && <Navigate to="/login" />}

      <Container>
        <Row className="justify-content-md-flex-start">
          <Col xs={12} md={5}>
            <div className="h3 mt-2 text-center">Your Profile</div>
            {msg === 0 && <Message variant="danger" msg={error} />}
            {msg === 1 && <Message variant="success" msg="Logged In" />}

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

              <Form.Group controlId="password">
                <Form.Label className="mt-2">Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="old password"
                  ref={oldPass}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="mt-2">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="new password"
                  ref={pass}
                ></Form.Control>
              </Form.Group>
              <Button className="mt-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col>
            <Row className="justify-content-md-center">
              <div className="h3 mt-2 text-center">Your Orders</div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen;
