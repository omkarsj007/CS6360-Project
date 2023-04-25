import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"

function CurrentStock() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/getProductStock", {})
        .then((res) => res.json())
        .then(data => {
            console.log("json:", data["data"]);
            setProducts(data["data"]);
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    return (
        <Row className="justify-content-md-center mt-5">
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Seller ID</th>
                        <th>Seller Username</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.Name}</td>
                            <td>{product.Category}</td>
                            <td>{product.Description}</td>
                            <td>{product.Price}</td>
                            <td>{product.Stock}</td>
                            <td>{product.sellerId}</td>
                            <td>{product.Username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Row>
    );
}

export default CurrentStock;