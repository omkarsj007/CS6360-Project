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

    function handleOnPriceClick()
    {
        navigate('/updateProductprice')
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
                <Col xs lg="6" className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleOnRejectedClick}>
                    Customer Transactions Status
                </Button>
                <Button variant="primary" size="lg" onClick={handleOnPriceClick}>
                     Update Product Price
                </Button>
                </Col>
            </Row>

            
        </Container>
        
      );
  };
  
  export default Admin;
  