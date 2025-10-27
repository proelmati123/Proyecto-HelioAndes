import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

function Planes() {
  const planes = [
    {
      nombre: 'Básico',
      subtitulo: '3-4 kW',
      beneficios: [
        'Estudio energético',
        'Instalación certificada',
        'Monitoreo básico',
        'Garantía 12 meses'
      ],
      destacado: false
    },
    {
      nombre: 'Optimizado',
      subtitulo: '10-15 kW',
      beneficios: [
        'Estudio avanzado',
        'Instalación premium',
        'Monitoreo en tiempo real',
        'Mantención anual',
        'Garantía 24 meses'
      ],
      destacado: true
    },
    {
      nombre: 'Híbrido + baterías',
      subtitulo: 'Autónomo',
      beneficios: [
        'Sistema off-grid',
        'Almacenamiento incluido',
        'Instalación especializada',
        'Monitoreo avanzado',
        'Garantía 36 meses'
      ],
      destacado: false
    }
  ];

  return (
    <section id="planes" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Planes</h2>
          <p className="lead text-muted">
            Elige el plan que mejor se adapta a tu proyecto
          </p>
        </div>
        <Row xs={1} md={3} className="g-4">
          {planes.map((plan, index) => (
            <Col key={index}>
              <Card 
                className={`h-100 border-0 shadow ${plan.destacado ? 'border-primary' : ''}`}
                style={plan.destacado ? { 
                  borderWidth: '3px', 
                  borderStyle: 'solid',
                  transform: 'scale(1.05)'
                } : {}}
              >
                {plan.destacado && (
                  <div 
                    className="text-center text-white py-2 fw-bold"
                    style={{ backgroundColor: '#1976d2' }}
                  >
                    MÁS POPULAR
                  </div>
                )}
                <Card.Body className="text-center p-4">
                  <Card.Title className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>
                    {plan.nombre}
                  </Card.Title>
                  <Card.Subtitle className="mb-4 text-muted">
                    {plan.subtitulo}
                  </Card.Subtitle>
                  <ListGroup variant="flush" className="mb-4 text-start">
                    {plan.beneficios.map((beneficio, idx) => (
                      <ListGroup.Item key={idx} className="border-0 px-0">
                        ✓ {beneficio}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button 
                    variant={plan.destacado ? 'primary' : 'outline-primary'}
                    className="w-100"
                    href="#demo-calculadora"
                    style={plan.destacado ? { 
                      backgroundColor: '#1976d2', 
                      borderColor: '#1976d2' 
                    } : { 
                      borderColor: '#1976d2', 
                      color: '#1976d2' 
                    }}
                  >
                    Solicitar evaluación
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

export default Planes;

