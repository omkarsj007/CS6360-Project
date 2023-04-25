import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import Row from "react-bootstrap/Row";
// import UserCard from "./components/UserCard";
import UserCard from "../components/UserCard";
import "../index.css"

function Sample() {
  const [data, setData] = useState({username: "", password: "", userType: ""});
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [output, setOutput] = useState([]);

  const handleChange = (e) => {
    const {id , value} = e.target   
        setData(prevState => ({
            ...prevState,
            [id] : value
    }))
  }

  const handleExecuteClick = async () => {
    const username = data.username;
    const password = data.password;
    const userType = data.userType;
    try {
      console.log("here")
      console.log("USERNAME: ", username)


    //   event.preventDefault();
        
      let params = {
          username: username,
          password: password,
          userType: userType,
      }
      const response = await fetch("http://localhost:8080/sample", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(params)
      })
      
      const data = await response.json();
      setResult(JSON.stringify(data));
      if(response.ok){
        
        localStorage.setItem("user", userType);
        if(userType == "customer")
        {
            window.location.href = '/customer';
        }
        else
        {
            window.location.href = '/admin';
        }
        
      }
      else{
        setErrorMessage("Invalid login")
      }

    //   const response = await fetch(`http://localhost:8080/validateLogin/${encodeURIComponent(email)}`);
    //   const data = await response.json();
    //   setResult(JSON.stringify(data));
    //   if(response.ok){
        
    //     window.location.href = '/';
    //   }
    //   else{
    //     setErrorMessage("Invalid login")
    //   }
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1> Login </h1>
      <form>
        <label>
          Username 
          <input type="text" id="username" value={data.username} onChange={handleChange}/>
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
          Login
        </button>
        {errorMessage && <div className="error"> {errorMessage} </div>}
      </form>
    </div>
  );
}

export default Sample;