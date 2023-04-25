import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"

function OrderHistory() {
    const [custId, setCustId] = useState([]);
    const [output, setOutput] = useState([]);

    const handleGetOrderHistory = (event) => {
        event.preventDefault();
        
        let params = {
            custId: custId,
        }

        fetch("http://localhost:8080/getOrderHistory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.text())
        .then(data => {
            console.log(data);
            setOutput(data);
        })
        .catch(err => {
            console.error(err);
            setOutput("Error: " + err.message);
        })
    }

    let outputHtml;

    if (output) {
        outputHtml = <p>{output}</p>
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

                {outputHtml}
            </Col>
        </Row>
    );
}

export default OrderHistory;
