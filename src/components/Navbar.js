import React, { useState } from 'react';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';

function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <BSNavbar 
      bg="light" 
      expand="lg" 
      fixed="top" 
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="shadow-sm"
    >
      <Container>
        <BSNavbar.Brand href="#inicio" onClick={handleNavClick}>
          <img
            src="/logo-helioandes.png"
            height="40"
            className="d-inline-block align-top"
            alt="HelioAndes"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<strong style="color: #0d6efd; font-size: 1.5rem;">HelioAndes</strong>';
            }}
          />
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#inicio" onClick={handleNavClick}>Inicio</Nav.Link>
            <Nav.Link href="#servicios" onClick={handleNavClick}>Servicios</Nav.Link>
            <Nav.Link href="#soluciones" onClick={handleNavClick}>Soluciones</Nav.Link>
            <Nav.Link href="#demo-calculadora" onClick={handleNavClick}>DEMO</Nav.Link>
            <Nav.Link href="#planes" onClick={handleNavClick}>Planes</Nav.Link>
            <Nav.Link href="#testimonios" onClick={handleNavClick}>Testimonios</Nav.Link>
            <Nav.Link href="#faq" onClick={handleNavClick}>FAQ</Nav.Link>
            <Nav.Link href="#contacto" onClick={handleNavClick}>Contacto</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;

