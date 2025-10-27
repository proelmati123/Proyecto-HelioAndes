import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Contacto() {
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setShowSuccess(true);
      setValidated(false);
      form.reset();
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <section id="contacto" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Contacto</h2>
          <p className="lead text-muted">
            Cuéntanos tu proyecto y agenda una asesoría
          </p>
        </div>
        <Row>
          <Col lg={6} className="mx-auto">
            {showSuccess && (
              <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
              </Alert>
            )}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Tu nombre completo" 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa tu nombre.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="tucorreo@ejemplo.com" 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa un correo válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  placeholder="Cuéntanos sobre tu proyecto..." 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa tu mensaje.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg"
                  style={{ backgroundColor: '#1976d2', borderColor: '#1976d2' }}
                >
                  Enviar
                </Button>
                <Button 
                  variant="outline-secondary" 
                  type="reset"
                  onClick={() => setValidated(false)}
                >
                  Limpiar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contacto;

