import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Testimonios() {
  const testimonios = [
    {
      nombre: 'Alejandra, Ñuñoa',
      comentario: 'La instalación fue rápida y profesional. Ya veo los ahorros en mi primera boleta.',
      avatar: '👩'
    },
    {
      nombre: 'Diego, Valdivia',
      comentario: 'El equipo explicó todo el proceso de forma clara. Excelente servicio.',
      avatar: '👨'
    },
    {
      nombre: 'Carla, Coquimbo',
      comentario: 'Muy contenta con el sistema. El monitoreo es fácil y la app es intuitiva. 100% recomendable.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <section id="testimonios" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Testimonios</h2>
          <p className="lead text-muted">
            Clientes que ya confían en HelioAndes
          </p>
        </div>
        <Row xs={1} md={3} className="g-4">
          {testimonios.map((testimonio, index) => (
            <Col key={index}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    {testimonio.avatar}
                  </div>
                  <Card.Text className="mb-3 fst-italic" style={{ fontSize: '0.95rem' }}>
                    "{testimonio.comentario}"
                  </Card.Text>
                  <Card.Title className="h6 fw-bold text-primary">
                    {testimonio.nombre}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Testimonios;

