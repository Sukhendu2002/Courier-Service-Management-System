import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      style={{
        //give some shadow on navbar
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Container>
        <img
          src="/logo.png"
          alt="hero"
          className="hero-img"
          style={{ width: "100px", height: "45px" }}
        />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Home
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/about">
              About
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
