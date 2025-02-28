/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar, Nav, Container, /* Button, Form */ } from "react-bootstrap";
import styles from "./SpaceNavbar.module.css"; // Custom styling
// import SearchCom from "./SearchCom";

const SpaceNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className={styles.navbar}
      variant="dark"
      id="top"
    >
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand href="/" className={styles.brand}>
          <div className={styles.logo}>
            <img src="/logo.png" style={{ width: "100px", height: "50px" }} />
          </div>
        </Navbar.Brand>

        {/* Navbar Toggler */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className={styles.toggler}
        />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/Explore" className={styles.navlink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/Mars" className={styles.navlink}>
              Mars
            </Nav.Link>
            <Nav.Link as={Link} href="/Gallery" className={styles.navlink}>
              Gallery & Search Engine
            </Nav.Link>
            <Nav.Link as={Link} href="/news" className={styles.navlink}>
              News
            </Nav.Link>
          </Nav>

          {/* Search Form */}
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className={`${styles.searchInput} me-2`}
            />
            <Button variant="outline-light" className={styles.searchButton}>
              🔍
            </Button>
          </Form> */}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SpaceNavbar;
