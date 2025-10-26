import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Servicios() {
  const servicios = [
    {
      titulo: 'Estudio energético',
      descripcion: 'Análisis de consumo y proyección de ahorro a 10 años',
      icono: '📊'
    },
    {
      titulo: 'Instalación certificada',
      descripcion: 'Instalación por personal certificado con estándares SEC',
      icono: '⚡'
    },
    {
      titulo: 'Monitoreo',
      descripcion: 'Monitoreo en tiempo real de tu generación y consumo',
      icono: '📱'
    },
    {
      titulo: 'Mantención',
      descripcion: 'Planes anuales de revisión y limpieza de los sistemas',
      icono: '🔧'
    }
  ];

  return (
    <section id="servicios" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Servicios</h2>
          <p className="lead text-muted">
            Estudio energético, instalación certificada, monitoreo y mantención
          </p>
        </div>
        <Row xs={1} md={2} lg={4} className="g-4">
          {servicios.map((servicio, index) => (
            <Col key={index}>
              <Card className="h-100 border-0 shadow-sm hover-shadow" style={{ transition: 'all 0.3s' }}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    {servicio.icono}
                  </div>
                  <Card.Title className="fw-bold mb-3">{servicio.titulo}</Card.Title>
                  <Card.Text className="text-muted">
                    {servicio.descripcion}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Servicios;

