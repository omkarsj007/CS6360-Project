import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import Row from "react-bootstrap/Row";
// import UserCard from "./components/UserCard";
import UserCard from "../components/UserCard";
import "../index.css"

function Login() {
  const [data, setData] = useState({username: "", password: "", userType: ""});
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const {id , value} = e.target   
        setData(prevState => ({
            ...prevState,
            [id] : value
    }))
  }

  const handleExecuteClick = async () => {
    const email = data.username;
    const password = data.password;
    const userType = data.userType;
    try {
      console.log("here")
      console.log("USERNAME: ", email)
      const response = await fetch(`http://localhost:8080/validateLogin/${encodeURIComponent(email)}`);
      const data = await response.json();
      setResult(JSON.stringify(data));
      if(response.ok){
        
        window.location.href = '/';
      }
      else{
        setErrorMessage("Invalid login")
      }
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
        <button type="button" onClick={handleExecuteClick}>
          Login
        </button>
        {errorMessage && <div className="error"> {errorMessage} </div>}
      </form>
    </div>
  );
}

export default Login;