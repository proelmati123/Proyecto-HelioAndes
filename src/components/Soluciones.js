import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Soluciones() {
  const soluciones = [
    {
      titulo: 'Hogar 3-5 kW',
      descripcion: 'Ideal para casas con consumo moderado y ahorro inmediato',
      icono: '🏠'
    },
    {
      titulo: 'PyME 10-20 kW',
      descripcion: 'Para pequeñas empresas con consumo diurno intensivo',
      icono: '🏢'
    },
    {
      titulo: 'Off-grid con baterías',
      descripcion: 'Sistemas autónomos para zonas sin red eléctrica',
      icono: '🔋'
    },
    {
      titulo: 'Híbridos',
      descripcion: 'Combinan red eléctrica con generación y almacenamiento',
      icono: '⚡'
    }
  ];

  return (
    <section id="soluciones" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Soluciones</h2>
          <p className="lead text-muted">
            Kits residenciales, PyME, off-grid con baterías y sistemas híbridos
          </p>
        </div>
        <Row xs={1} md={2} lg={4} className="g-4">
          {soluciones.map((solucion, index) => (
            <Col key={index}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    {solucion.icono}
                  </div>
                  <Card.Title className="fw-bold mb-3">{solucion.titulo}</Card.Title>
                  <Card.Text className="text-muted mb-4">
                    {solucion.descripcion}
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    href="#contacto"
                    style={{ borderColor: '#1976d2', color: '#1976d2' }}
                  >
                    Solicitar asesoría
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Soluciones;

