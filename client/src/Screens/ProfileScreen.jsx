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

  console.log(user.name);
  console.log(user.email);
  return (
    <div>
      {!Cookies.get("JWT") && <Navigate to="/login" />}

      <Container className="mt-3">
        <Row>
          <h2 className="text-center">{user.name}'s' Profile</h2>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Row>
              <em className="h5 text-center">Name:{user.name}</em>
            </Row>
            <Row>
              <em className="h5 text-center">email:{user.email}</em>
            </Row>
          </Col>
          <Col md={6}>
            <em className="h5 text-center">
              <Link to="/editprofile">Edit Profile</Link>
            </em>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen;
