import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from "../redux/cart";

function ShippingScreen() {
  const address = useRef("");
  const city = useRef("");
  const country = useRef("");
  const postalCode = useRef(0);

  const dispatch = useDispatch();
  const submitHandle = (e) => {
    e.preventDefault();

    console.log("saved");
    const shippingDetails = {
      address: address.current.value,
      city: city.current.value,
      country: country.current.value,
      postalCode: postalCode.current.value,
    };
    dispatch(saveShippingAddress(shippingDetails));
  };

  return (
    <Container as="div" style={{ maxWidth: "50%" }} className="mx-auto">
      <h1 className="text-center pt-2">Shipping Address</h1>
      <Form>
        <Form.Group controlId="address">
          <Form.Label className="p-2">Address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            ref={address}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label className="p-2">City:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            ref={city}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postal code">
          <Form.Label className="p-2">Postal Code:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter pin"
            ref={postalCode}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label className="p-2">Country:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pin"
            ref={country}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-2 ml-5" variant="primary" onClick={submitHandle}>
          Continue
        </Button>
      </Form>
    </Container>
  );
}

export default ShippingScreen;
