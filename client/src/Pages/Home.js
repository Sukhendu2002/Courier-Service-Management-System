import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import server from "../config/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   setUser(JSON.parse(user));
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${server}/api/customer/create`, {
          customer_email: email,
          customer_password: password,
          customer_name: name,
        })
        .then((res) => {
          console.log(res.data.data[0].insertId);
          const user = {
            customer_id: res.data.data[0].insertId,
            customer_email: email,
            customer_password: password,
            customer_name: name,
          };
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/user/dashboard");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="hero">
      <div
        className="hero-text"
        style={{
          marginLeft: "20%",
          display: "block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "30%",
        }}
      >
        <h1>Join the India's Fastest Courier Service</h1>
        <p>
          We are the fastest courier service in India. We deliver your parcel
          within 24 hours.
        </p>

        <Form>
          <h3>Sign Up</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Join Now
          </Button>
        </Form>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/userlogin">Already have an account? Login</Link>
          <Link to="/adminlogin">Admin Login</Link>
        </div>
      </div>

      {/* <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Home
      </h1>
      <div
        //make it center
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{ width: "200px", marginBottom: "20px" }}
          variant="primary"
          as={Link}
          to="/adminlogin"
        >
          Admin Login
        </Button>{" "}
        <Button
          style={{ width: "200px", marginBottom: "20px" }}
          variant="secondary"
          as={Link}
          to="/stafflogin"
        >
          Staff Login
        </Button>{" "}
        <Button
          style={{ width: "200px", marginBottom: "20px" }}
          variant="success"
          as={Link}
          to="/userlogin"
        >
          User Login
        </Button>{" "}
      </div> */}
    </div>
  );
};

export default Home;
