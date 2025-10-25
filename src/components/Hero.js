import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Hero() {
  return (
    <section id="inicio" className="py-5" style={{ 
      marginTop: '70px', 
      background: 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 100%)' 
    }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#1976d2' }}>
              Energía solar accesible y confiable para tu hogar o pyme
            </h1>
            <p className="lead mb-4" style={{ color: '#555' }}>
              Transforma tu sistema, reduce el costo eléctrico y utiliza energía de manera sostenible. 
              La DEMO te guía con una cotización rápida y detallada.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button 
                variant="primary" 
                size="lg" 
                href="#demo-calculadora"
                style={{ backgroundColor: '#1976d2', borderColor: '#1976d2' }}
              >
                Ver DEMO
              </Button>
              <Button 
                variant="outline-primary" 
                size="lg" 
                href="/catalogo-helioandes.pdf"
                download
                style={{ borderColor: '#1976d2', color: '#1976d2' }}
              >
                Descargar Catálogo
              </Button>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <img 
              src="/solar-panel-hero.jpg" 
              alt="Panel Solar" 
              className="img-fluid rounded shadow"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect fill="%231976d2" width="600" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EPaneles Solares%3C/text%3E%3C/svg%3E';
              }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;

