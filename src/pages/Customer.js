import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import Row from "react-bootstrap/Row";
// import UserCard from "./components/UserCard";
import UserCard from "../components/UserCard";
import "../index.css"

import { useNavigate, Link } from "react-router-dom";
import { Table, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

const Customer = () => {
  let [orderHistory, setOrderHistory] = useState()

  const navigate = useNavigate();
  function handlePurchaseClick() {
    navigate('/purchaseProduct')
  }

  const handleLogout = async () => {
    localStorage.removeItem("user");
    navigate('/sample')
  }

  const handleGetOrderHistory = (event) => {
    event.preventDefault();

    let params = {
      custId: localStorage.getItem("cust_id"),
    }

    fetch("http://localhost:8080/getOrderHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then((res) => res.text())
      .then(data => {
        console.log(data);
        setOrderHistory(data);
      })
      .catch(err => {
        console.error(err);
        setOrderHistory("Error: " + err.message);
      })
  }

  if (localStorage.getItem("user") == null) {
    return (
      <Container className="bg-tertiary-color profile-page">
        <br></br>
        <Row className="justify-content-md-center">
          <Col xs lg="6" className="text-center">
            <h2> Please Log in</h2>
          </Col>
        </Row>
      </Container>
    )
  }

  let outputHtml;

  if (orderHistory) {
    outputHtml = <p>{orderHistory}</p>
  }

  return (
    <Container className="bg-tertiary-color profile-page">
      <br></br>
      <Row className="justify-content-md-center">
        <Col xs lg="6" className="text-center">
          <h2> Customer Actions</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg="6" className="d-grid gap-2" >
          <Button variant="primary" size="lg" onClick={handlePurchaseClick}>
            Purchase Product
          </Button>
          <Button variant="primary" size="lg" onClick={handleGetOrderHistory}>
            Get Order History
          </Button>
          <Button variant="primary" size="lg" onClick={handleLogout}>
            Log out
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg="6" className="d-grid gap-2" >
          {orderHistory &&
            <>
              <h3>Order History:</h3>
              {outputHtml}
            </>
          }
        </Col>
      </Row>
    </Container>

  );
};

export default Customer;
