import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { Button, Table, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"

function SellerInventoryTable(props) {

    const [info] = useState(props.data);


  return (
    <div className="text-center">
        <br></br>
        
        <br></br>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="7">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Product ID</th>
                        <th>Seller ID</th>
                        <th>Price</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Product_ID}</td>
                            <td>{item.Seller_ID}</td>
                            <td>{item.Price}</td>
                            <td>{item.Name}</td>
                            <td>{item.Category}</td>
                            <td>{item.Description}</td>
                            <td>{item.Stock}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
        </Container>
        
    
    </div>
    
  );
}

function SellerInventory() {
    const [sellerId, setSellerId] = useState([]);
    const [output, setOutput] = useState([]);
    const [cleanData, setCleanData] = useState([]);

    const handleGetSellerInventory = (event) => {
        event.preventDefault();
        
        let params = {
            sellerId: sellerId,
        }

        // fetch("http://localhost:8080/getSellerInventory", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(params)
        // })
        fetch(`http://localhost:8080/getSellerInventory?sellerId=${sellerId}`)
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            console.log(data.data)
            const cData = data.data.map(item => {
                return {
                    Product_ID: item.Product_ID,
                    Seller_ID: item.Seller_ID,
                    Price: item.Price,
                    Name: item.Name,
                    Category: item.Category,
                    Description: item.Description,
                    Stock: item.Stock
                };
              });
            // setOutput(data);
            setCleanData(cData)
        })
        .catch(err => {
            console.error(err);
            setOutput("Error: " + err.message);
        })
    }

    // let outputHtml;

    // if (output) {
    //     outputHtml = <div>{output}</div>
    // }

    return (
        <Row className="justify-content-md-center mt-5">
            <Col xs lg="7" className="d-grid gap-2">
                <form onSubmit={handleGetSellerInventory}>
                    <Button variant="primary" size="lg" type="submit">
                        Get Seller Inventory
                    </Button>
                    <br></br>
                    <label htmlFor="SellerId">Seller ID: </label>
                    <input type="text" id="sellerId" value={sellerId} onChange={e => setSellerId(e.target.value)} required/>
                </form>

                <SellerInventoryTable data={cleanData}/>
            </Col>
        </Row>
    );
}

export default SellerInventory;