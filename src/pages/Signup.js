import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import Row from "react-bootstrap/Row";
// import UserCard from "./components/UserCard";
import UserCard from "../components/UserCard";
import "../index.css"

function Signup() {
  const [data, setData] = useState({username: "", password: "", userType: ""});
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const {id , value} = e.target   
        setData(prevState => ({
            ...prevState,
            [id] : value
    }))
  }

  const handleExecuteClick = async () => {
    const email_ = data.username;
    const password_ = data.password;
    const userType_ = data.userType;
    let params = {
        email: email_,
        password: password_,
        userType: userType_
    }
    fetch("http://localhost:8080/addNewUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    .then((res) => res.text())
    .then(data => {
        console.log(data);
        // setOutput(data);
    })
    .catch(err => {
        console.error(err);
        // setOutput("Error: " + err.message);
    })
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1> Create Account </h1>
      <form>
        <label>
          Username 
          <input type="text" id="username" value={data.sername} onChange={handleChange}/>
        </label>
        <br></br><br></br>
        <label>
          Password 
          <input type="text" id="password" value={data.password} onChange={handleChange}/>
        </label>
        <br></br><br></br>
        <label>
          User Type 
          <input type="text" id="userType" value={data.userType} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <button type="button" onClick={handleExecuteClick}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;