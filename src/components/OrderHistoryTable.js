import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';

const OrderHistoryTable = (props) => {
  let json = props.orderHistoryRes

  if (json instanceof String || typeof json === "string") {
    return <p>{json}</p>
  }

  let orders = json.data
  console.log(orders)

  return (
    <>
      <h3>Order History:</h3>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          {orders.map(e => (
            <tr>
              <td>{e.Name}</td>
              <td>{e.Count}</td>
              <td>{e.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderHistoryTable;
