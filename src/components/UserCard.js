import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "../index.css";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  
  const [info] = useState(props);

  return (
    <Col>
      {/* <Link className="nav-link" to="/propertyInfo" state={{ info: info }}> */}
        <Card
          className="grow"
          variant="dark"
          text="light"
          bg="dark"
          style={{ minHeight: "20rem", height: "29rem" }}
        >
          <Card.Img
            variant="top"
            src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            style={{ height: "12rem" }}
            className="cover"
          />
          <Card.Body>
            <Card.Title>{props.property.FirstName}    {props.property.LastName} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Address: {props.property.Address}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              City: {props.property.city}
            </Card.Subtitle>
            <Card.Text className="d-none d-xl-block">
              {/* {props.property.description.substring(0, 120)}... */}
            </Card.Text>
            <Card.Subtitle className="mb-2">
              {/* {money(props.property.nightly_fee["$numberDecimal"])}/night */}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      
    </Col>
  );
};

export default UserCard;
