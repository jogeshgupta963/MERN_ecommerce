import React, { useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import axios from "axios";

function ForgotPassword() {
  const email = useRef("");

  const [msg, setMsg] = React.useState(-1);
  const [error, setError] = React.useState("");
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/forgot-password", {
        email: email.current.value,
      });
      if (data) setMsg(1);
      setError(data);
    } catch (err) {
      setError(err);
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
                <Form.Label className="mt-2">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter email"
                  ref={email}
                ></Form.Control>
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                LogIn
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
