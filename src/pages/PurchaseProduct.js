import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"

import CurrentStock from "./CurrentStock";

function PurchaseProduct() {
    const [productId, setProductId] = useState([]);
    const [sellerId, setSellerId] = useState([]);
    const [count, setCount] = useState([]);
    const [output, setOutput] = useState(null);

    const handlePurchaseProduct = (event) => {
        event.preventDefault();
        
        let params = {
            customerId: localStorage.getItem("cust_id"),
            productId: productId,
            sellerId: sellerId,
            count: count,
        }
        fetch("http://localhost:8080/purchaseItems", {
            method: "POST",
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

    var outputHtml;
    if (output) {
        outputHtml = <p>{output}</p>
    }

    return (
        <Row className="justify-content-md-center mt-5">
            <CurrentStock />
            <Col xs lg="6" className="d-grid gap-2">
                <form onSubmit={handlePurchaseProduct}>
                    <br></br>
                    <Button variant="primary" size="lg" type="submit">
                        Place Order
                    </Button>
                    <br></br>
                    <label htmlFor="productId">Product ID: </label>
                    <input type="text" id="productId" value={productId} onChange={e => setProductId(e.target.value)} required/>
                    <br></br>
                    <label htmlFor="sellerId">Seller ID: </label>
                    <input type="text" id="sellerId" value={sellerId} onChange={e => setSellerId(e.target.value)} required/>
                    <br></br>
                    <label htmlFor="count">Quantity: </label>
                    <input type="number" id="count" value={count} onChange={e => setCount(e.target.value)} required/>
                </form>

                {outputHtml}
            </Col>
        </Row>
    );
}

export default PurchaseProduct;
