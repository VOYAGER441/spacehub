"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import styles from "./SpaceNavbar.module.css"; // Custom styling

const SpaceNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className={styles.navbar}
      variant="dark"
    >
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand href="#" className={styles.brand}>
          🚀 SpaceHub
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
            <Nav.Link as={Link} href="/" className={styles.navlink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/gallery" className={styles.navlink}>
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} href="/missions" className={styles.navlink}>
              Missions
            </Nav.Link>
            <Nav.Link as={Link} href="/news" className={styles.navlink}>
              News
            </Nav.Link>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className={`${styles.searchInput} me-2`}
            />
            <Button variant="outline-light" className={styles.searchButton}>
              🔍
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SpaceNavbar;
