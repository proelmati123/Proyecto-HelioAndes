import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-white" style={{ backgroundColor: '#0a2540' }}>
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              © {currentYear} HelioAndes Energía. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="/#" className="text-white text-decoration-none me-3">
              Privacidad
            </a>
            <a href="/#" className="text-white text-decoration-none">
              Términos
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

