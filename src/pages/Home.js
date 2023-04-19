import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import Row from "react-bootstrap/Row";
// import UserCard from "./components/UserCard";
import UserCard from "../components/UserCard";
import "../index.css"

const Home = () => {
    // const [profile, setProfile] = useState({});
    
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/getAllTodos")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data);
        })
        .catch(console.log);
    }, []);
  
    return (
        <div className="bg-tertiary-color profile-page" style={{ height: "100%" }}>
            <div className="fs-1 fw-bold font d-flex justify-content-center">
                Users
            </div>
            <div className="ms-5 me-5 mt-4 pb-5">
                <Container fluid >
                        <Row xs={1} md={4} xxl={6} className="g-4">
                            {users
                            .map((p) => (
                                <UserCard key={p.ID} property={p} />
                            ))}
                        </Row>
                </Container>
            </div>
        </div>
        
        
      );
  };
  
  export default Home;
  