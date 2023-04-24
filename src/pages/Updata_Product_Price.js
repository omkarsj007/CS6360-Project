import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"

function Updata_Product_Price() {
    const [productId, setProductId] = useState([]);
    const [sellerId, setSellerId] = useState([]);
    const [admin_seller, setadmin_seller] = useState([]);
    const [Product_Price, setProduct_Price] = useState([]);
    const [output, setOutput] = useState([]);

    const handlePurchaseProduct = (event) => {
        event.preventDefault();
        
        let params = {
            productId: productId,
            sellerId: sellerId,
            admin_seller: admin_seller,
            Product_Price: Product_Price
        }
        fetch("http://localhost:8080/UpdateProductPrice", {
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
            <Col xs lg="6" className="d-grid gap-2">
                <form onSubmit={handlePurchaseProduct}>
                    <Button variant="primary" size="lg" type="submit">
                        Update Price
                    </Button>
                    <br></br>
                    <label htmlFor="productId">Product ID: </label>
                    <input type="text" id="productId" value={productId} onChange={e => setProductId(e.target.value)} required/>
                    <br></br>
                    <label htmlFor="sellerId">Seller ID: </label>
                    <input type="text" id="sellerId" value={sellerId} onChange={e => setSellerId(e.target.value)} required/>
                    <br></br>
                    <label htmlFor="admin_seller">Set Admin Seller: </label>
                    <input type="text" id="admin_seller" value={admin_seller} onChange={e => setadmin_seller(e.target.value)} required/>
                    <br></br>
                    <label htmlFor="Product_Price">Product Price: </label>
                    <input type="number" id="Product_Price" value={Product_Price} onChange={e => setProduct_Price(e.target.value)} required/>
                </form>

                {outputHtml}
            </Col>
        </Row>
    );
}

export default Updata_Product_Price;
