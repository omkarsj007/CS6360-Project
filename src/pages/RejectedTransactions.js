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

function RejectionsTable(props) {

    const [info] = useState(props.data);

    const navigate = useNavigate()
    function handleHome()
    {
        navigate('/admin')
    }

  return (
    <div className="text-center">
        <br></br>
        <h2>Rejected Transactions</h2>
        <br></br>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone_no</th>
                        <th>Rejected Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone_no}</td>
                            <td>{item.Rejected_tran}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
        </Container>
        
    <Button variant="primary" className="mx-auto d-block mt-4" onClick={handleHome}>Home</Button>
    </div>
    
  );
}

const RejectedTransactions = () => {
    // const [profile, setProfile] = useState({});
    
    const [users, setUsers] = useState([]);
    const [cleanData, setCleanData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/getRejected")
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
            const cData = data.data.map(item => {
                return {
                    id: item.Cust_id,
                    name: item.Name,
                    email: item.Email,
                    phone_no: item.Phone_no,
                    Rejected_tran: item.Rejected_Transactions
                };
              });
              console.log(cData)
          setCleanData(cData);
        })
        .catch(console.log);
    }, []);
  
    return (
        <Container className="bg-tertiary-color profile-page" style={{ height: "100%" }}>
            <RejectionsTable data={cleanData} />
        </Container>
        
        
      );
  };
  
  export default RejectedTransactions;
  