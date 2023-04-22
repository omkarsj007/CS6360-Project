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

import PurchaseProduct from "./PurchaseProduct";

const Admin = () => {
    
    const navigate = useNavigate();
    function handleOnRejectedClick()
    {
        navigate('/rejectedTransactions')
    }

    return (
        <Container className="bg-tertiary-color profile-page">
            <br></br>
            <Row className="justify-content-md-center">
                <Col xs lg="6" className="text-center">
                    <h2> Admin Actions</h2>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Col xs lg="6" className="d-grid gap-2" onClick={handleOnRejectedClick}>
                <Button variant="primary" size="lg">
                    Users with Rejected Transactions
                </Button>
                <Button variant="primary" size="lg">
                    Action 2
                </Button>
                </Col>
            </Row>

            <PurchaseProduct />
        </Container>
        
      );
  };
  
  export default Admin;
  