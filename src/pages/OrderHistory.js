import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import "../components/OrderHistoryTable"

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"
import OrderHistoryTable from "../components/OrderHistoryTable";

function OrderHistory() {
    const [custId, setCustId] = useState([]);
    const [output, setOutput] = useState();

    const handleGetOrderHistory = (event) => {
        event.preventDefault();
        
        let params = {
            custId: custId,
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
            setOutput(JSON.parse(data));
        })
        .catch(err => {
            console.error(err);
            setOutput("Error: " + err.message);
        })
    }

    return (
        <Row className="justify-content-md-center mt-5">
            <Col xs lg="6" className="d-grid gap-2">
                <form onSubmit={handleGetOrderHistory}>
                    <Button variant="primary" size="lg" type="submit">
                        Get Order History
                    </Button>
                    <br></br>
                    <label htmlFor="custId">Customer ID: </label>
                    <input type="text" id="custId" value={custId} onChange={e => setCustId(e.target.value)} required/>
                </form>
                {output && <OrderHistoryTable orderHistoryRes={output}/>}
            </Col>
        </Row>
    );
}

export default OrderHistory;
