import React, { useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import axios from "axios";

function ResetPassword() {
  console.log("hello");
  const confirmPassword = useRef("");
  const password = useRef("");

  const { id } = useParams();

  const [msg, setMsg] = React.useState(-1);
  const [error, setError] = React.useState("");
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      if (password.current.value !== confirmPassword.current.value) {
        throw new Error("passwords does not match");
      }
      const { data } = await axios.post(`/user/resetPassword/${id}`, {
        password: password.current.value,
      });
      if (data) setMsg(1);
      setError("password reset successfully");
    } catch ({ message }) {
      setError(message);
      setMsg(0);
    }
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mt-2 text-center">Reset Password</h1>
            {msg === 0 && <Message variant="danger" msg={error} />}
            {msg === 1 && <Message variant="success" msg={error} />}

            <Form onSubmit={submitHandle}>
              <Form.Group controlId="email">
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new Password"
                  ref={password}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label className="mt-2">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password again.."
                  ref={confirmPassword}
                ></Form.Control>
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                Reset
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResetPassword;
