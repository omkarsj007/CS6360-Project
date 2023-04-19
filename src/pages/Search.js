import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import Row from "react-bootstrap/Row";
// import UserCard from "./components/UserCard";
import UserCard from "../components/UserCard";
import "../index.css"


function Search() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleExecuteClick = async () => {
    try {
      console.log("here")
      const response = await fetch('http://localhost:8080/getQuery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1> Run SQL query</h1>
      <form>
        <label>
          Enter query:
          <input type="text" value={query} onChange={handleQueryChange} />
        </label>
        <button type="button" onClick={handleExecuteClick}>
          Execute
        </button>
      </form>
      <textarea value={result} readOnly style={{ marginTop: "20px" }} />
    </div>
  );
}

export default Search;
