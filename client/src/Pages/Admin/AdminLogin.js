import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import server from "../../config/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    // console.log(email, password);
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      axios
        .post(`${server}/api/admin/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data.data);
          //set token in local storage
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setLoading(false);
          navigate("/admin/dashboard");
        });
    } catch (error) {
      console.log(error);
      //   setLoading(false);
    }
    // setLoading(false);
  };

  return (
    <div
      className="container mt-5"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "white",
        width: "50%",
      }}
    >
      <h1
        //make it center
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Admin Login
      </h1>
      <Form>
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            //validate email
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button
          variant="primary"
          //   type="submit"
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
