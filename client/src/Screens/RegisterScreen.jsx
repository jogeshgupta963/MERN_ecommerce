import React, { useRef } from "react";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/user.js";

function RegisterScreen() {
  const email = useRef("");
  const pass = useRef("");
  const conPass = useRef("");
  const name = useRef("");

  const [msg, setMsg] = React.useState(-1);
  const dispatch = useDispatch();

  const [error, setError] = React.useState("");

  const submitHandle = async (e) => {
    e.preventDefault();
    if (
      pass.current.value === "" ||
      conPass.current.value === "" ||
      name.current.value === "" ||
      email.current.value === ""
    ) {
      throw new Error("Please fill all the fields");
    }
    try {
      if (pass.current.value !== conPass.current.value) {
        throw new Error("Passwords do not match");
      }
      axios.defaults.withCredentials = true;
      const { data } = await axios.post("/user/register", {
        name: name.current.value,
        email: email.current.value,
        password: pass.current.value,
      });
      if (!data) throw new Error("Something went wrong");

      dispatch(getUser({ ...data }));
      setMsg(1);
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        setError("Email already exists");
        setMsg(0);
      } else {
        setError(error.message);
        setMsg(0);
      }
    }
  };

  return (
    <div>
      {Cookies.get("JWT") && <Navigate to="/" />}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mt-2 text-center">Signup</h1>
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
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter password"
                  ref={pass}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="mt-2">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="re-enter password"
                  ref={conPass}
                ></Form.Control>
              </Form.Group>
              <Button className="mt-3" type="submit" variant="primary">
                Signup
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                Already have an account?<Link to="/login"> Login</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterScreen;
