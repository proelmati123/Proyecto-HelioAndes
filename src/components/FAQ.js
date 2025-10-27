import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

function FAQ() {
  const preguntas = [
    {
      pregunta: '¿Incluyen trámites y certificaciones?',
      respuesta: 'Sí, gestionamos todos los permisos ante la SEC (Superintendencia de Electricidad y Combustibles) y coordinamos la conexión con la distribuidora eléctrica.'
    },
    {
      pregunta: '¿Ofrecen financiamiento?',
      respuesta: 'Trabajamos con diferentes instituciones financieras para ofrecer planes de pago flexibles. Consulta las opciones disponibles en nuestra calculadora DEMO.'
    },
    {
      pregunta: '¿Tienen disponible a regiones?',
      respuesta: 'Sí, realizamos instalaciones en todo Chile. Los costos de envío varían según la región y están incluidos en la cotización.'
    },
    {
      pregunta: '¿Cuánto tiempo toma la instalación?',
      respuesta: 'Una instalación residencial típica (3-5 kW) toma entre 1 y 2 días. Sistemas más grandes pueden requerir 3-5 días dependiendo de la complejidad.'
    },
    {
      pregunta: '¿Qué garantías incluyen?',
      respuesta: 'Ofrecemos garantía de 12 a 36 meses según el plan elegido, que cubre equipos e instalación. Los paneles tienen garantía del fabricante de 25 años.'
    }
  ];

  return (
    <section id="faq" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">FAQ</h2>
          <p className="lead text-muted">
            Preguntas frecuentes
          </p>
        </div>
        <Row>
          <Col lg={8} className="mx-auto">
            <Accordion>
              {preguntas.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>
                    <strong>{item.pregunta}</strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    {item.respuesta}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default FAQ;

