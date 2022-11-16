import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);
  return (
    <div className="container">
      <h1
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
          to="/branchlogin"
        >
          Branch Head Login
        </Button>{" "}
        <Button
          style={{ width: "200px", marginBottom: "20px" }}
          variant="success"
          as={Link}
          to="/stafflogin"
        >
          Staff Login
        </Button>{" "}
      </div>
    </div>
  );
};

export default Home;
