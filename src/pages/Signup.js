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
    const username_ = data.username;
    const password_ = data.password;
    const userType_ = data.userType;
    let params = {
        username: username_,
        password: password_,
        userType: userType_
    }

    try {
        console.log("here")
        console.log("usertype: ", userType_)

        const response = await fetch("http://localhost:8080/addNewUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        
        const data = await response.json();
        setResult(JSON.stringify(data));
        if(response.ok){
            window.location.href = '/sample';
        }
        else{
          console.log("Invalid account creation")
        }
      } catch (error) {
        console.error(error);
      }
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
          <select id="userType" value={data.userType} onChange={handleChange}>
            <option value="">Select a user type</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
          </select>
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