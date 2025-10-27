import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';

function CalculadoraIntegral() {
  // Estados para inputs numéricos
  // NOTA: Los inicializamos con números, pero ahora aceptarán cadenas (como "") al escribir.
  const [potenciaPanelW, setPotenciaPanelW] = useState(450);
  const [cantidadPaneles, setCantidadPaneles] = useState(10);
  const [precioInversor, setPrecioInversor] = useState(800000);
  const [precioBateria, setPrecioBateria] = useState(0);
  const [cantidadBaterias, setCantidadBaterias] = useState(0);
  const [precioEstructuras, setPrecioEstructuras] = useState(300000);
  const [instalacionBase, setInstalacionBase] = useState(400000);
  const [pesoEnvioKg, setPesoEnvioKg] = useState(300);
  const [valorPie, setValorPie] = useState(20); // Agregado

  // Estados para selects
  const [tipoTecho, setTipoTecho] = useState('teja');
  const [region, setRegion] = useState('rm');
  const [complejidadInstalacion, setComplejidadInstalacion] = useState('baja');
  const [subsidio, setSubsidio] = useState('sin');
  const [metodoEnvio, setMetodoEnvio] = useState('estandar');
  const [garantia, setGarantia] = useState('12');
  const [planPago, setPlanPago] = useState('contado');
  const [tipoPie, setTipoPie] = useState('porcentaje');

  // Estados para resultados
  const [resultados, setResultados] = useState(null);
  const [advertencia, setAdvertencia] = useState('');

  // 💡 FUNCIÓN DE AYUDA: Convierte el valor del estado a un número seguro (0 si es "")
  const getNumValue = (stateValue) => {
      // Si el valor es una cadena vacía o nulo, retorna 0.
      if (stateValue === "" || stateValue === null) return 0;
      // Intenta convertir a número.
      const num = Number(stateValue);
      // Si la conversión resulta en NaN (ej: solo un "-" o letras), retorna 0, sino el número.
      return isNaN(num) ? 0 : num;
  };


  // Función de cálculo
  const calcular = () => {
    // 💡 PASO CLAVE: Usar getNumValue para obtener valores numéricos seguros para los cálculos
    const potenciaW = getNumValue(potenciaPanelW);
    const cantidadP = getNumValue(cantidadPaneles);
    const precioInv = getNumValue(precioInversor);
    const precioBat = getNumValue(precioBateria);
    const cantidadB = getNumValue(cantidadBaterias);
    const precioEst = getNumValue(precioEstructuras);
    const instalacionB = getNumValue(instalacionBase);
    const pesoEnv = getNumValue(pesoEnvioKg);
    const valorP = getNumValue(valorPie);


    // 1. Potencia estimada
    const potenciaEstimadaKW = (potenciaW * cantidadP) / 1000;

    // 2. Advertencia si potencia > 7 kW y sin baterías
    if (potenciaEstimadaKW > 7 && cantidadB === 0) {
      setAdvertencia('Recomendado considerar almacenamiento para estabilidad del sistema.');
    } else {
      setAdvertencia('');
    }

    // 3. Subtotal equipos
    const subtotalEquipos = precioInv + (precioBat * cantidadB) + precioEst;

    // 4. Recargo por tipo de techo
    let porcentajeTecho = 0;
    switch (tipoTecho) {
      case 'teja':
        porcentajeTecho = 0.05;
        break;
      case 'zinc':
        porcentajeTecho = 0.02;
        break;
      case 'hormigon':
        porcentajeTecho = 0.07;
        break;
      default:
        porcentajeTecho = 0;
    }
    const recargoTecho = subtotalEquipos * porcentajeTecho;

    // 5. Instalación final (con complejidad)
    let porcentajeComplejidad = 0;
    switch (complejidadInstalacion) {
      case 'media':
        porcentajeComplejidad = 0.08;
        break;
      case 'alta':
        porcentajeComplejidad = 0.15;
        break;
      default:
        porcentajeComplejidad = 0;
    }
    const instalacionFinal = instalacionB * (1 + porcentajeComplejidad);

    // 6. Subsidio
    let porcentajeSubsidio = 0;
    switch (subsidio) {
      case 'residencial':
        porcentajeSubsidio = -0.08;
        break;
      case 'pyme':
        porcentajeSubsidio = -0.05;
        break;
      default:
        porcentajeSubsidio = 0;
    }
    const montoSubsidio = (subtotalEquipos + recargoTecho) * porcentajeSubsidio;

    // 7. Garantía extendida
    let porcentajeGarantia = 0;
    switch (garantia) {
      case '12':
        porcentajeGarantia = 0.02;
        break;
      case '24':
        porcentajeGarantia = 0.04;
        break;
      case '36':
        porcentajeGarantia = 0.06;
        break;
      default:
        porcentajeGarantia = 0;
    }
    const montoGarantia = subtotalEquipos * porcentajeGarantia;

    // 8. Envío
    let baseEnvio = 0;
    switch (region) {
      case 'rm':
        baseEnvio = 5000;
        break;
      case 'norte':
        baseEnvio = 9000;
        break;
      case 'sur':
        baseEnvio = 10000;
        break;
      case 'austral':
        baseEnvio = 15000;
        break;
      default:
        baseEnvio = 5000;
    }
    const costoEnvioBase = baseEnvio + (pesoEnv * 700);
    const multiplicadorEnvio = metodoEnvio === 'expres' ? 1.2 : 1.0;
    const costoEnvioFinal = costoEnvioBase * multiplicadorEnvio;

    // 9. Total antes de IVA
    const totalAntesIVA = subtotalEquipos + recargoTecho + montoSubsidio + instalacionFinal + montoGarantia + costoEnvioFinal;

    // 10. IVA (19%)
    const iva = totalAntesIVA * 0.19;

    // 11. Total antes de financiar
    const totalAntesFinanciar = totalAntesIVA + iva;

    // 12. Financiamiento
    let tasaMensual = 0;
    let numeroCuotas = 1;
    switch (planPago) {
      case '6':
        tasaMensual = 0.012;
        numeroCuotas = 6;
        break;
      case '12':
        tasaMensual = 0.011;
        numeroCuotas = 12;
        break;
      case '24':
        tasaMensual = 0.010;
        numeroCuotas = 24;
        break;
      default:
        tasaMensual = 0;
        numeroCuotas = 1;
    }

    // Calcular pie
    let montoPie = 0;
    if (tipoPie === 'porcentaje') {
      montoPie = totalAntesFinanciar * (valorP / 100);
    } else {
      montoPie = Math.min(valorP, totalAntesFinanciar);
    }

    // Monto a financiar
    const montoFinanciar = totalAntesFinanciar - montoPie;

    // Interés total
    const interesTotal = montoFinanciar * tasaMensual * numeroCuotas;

    // Cuota mensual
    const cuotaMensual = numeroCuotas > 1 ? (montoFinanciar + interesTotal) / numeroCuotas : 0;

    // Total final
    const totalFinal = totalAntesFinanciar + interesTotal;

    // Guardar resultados
    setResultados({
      potenciaEstimadaKW: potenciaEstimadaKW.toFixed(2),
      subtotalEquipos,
      recargoTecho,
      montoSubsidio,
      instalacionFinal,
      iva,
      costoEnvioFinal,
      montoGarantia,
      totalAntesFinanciar,
      montoPie,
      interesTotal,
      cuotaMensual,
      totalFinal,
      numeroCuotas
    });
  };

  useEffect(() => {
    calcular();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    potenciaPanelW, cantidadPaneles, precioInversor, precioBateria, cantidadBaterias,
    precioEstructuras, instalacionBase, pesoEnvioKg, tipoTecho, region,
    complejidadInstalacion, subsidio, metodoEnvio, garantia, planPago, tipoPie, valorPie
  ]);

  const reiniciar = () => {
    setPotenciaPanelW(450);
    setCantidadPaneles(10);
    setPrecioInversor(800000);
    setPrecioBateria(0);
    setCantidadBaterias(0);
    setPrecioEstructuras(300000);
    setInstalacionBase(400000);
    setPesoEnvioKg(300);
    setTipoTecho('teja');
    setRegion('rm');
    setComplejidadInstalacion('baja');
    setSubsidio('sin');
    setMetodoEnvio('estandar');
    setGarantia('12');
    setPlanPago('contado');
    setTipoPie('porcentaje');
    setValorPie(20);
    setAdvertencia('');
  };

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  return (
    <section id="demo-calculadora" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">DEMO Calculadora</h2>
          <p className="lead text-muted">
            Materializa tu formulario y visualiza el costo total de una instalación
          </p>
        </div>

        {advertencia && (
          <Alert variant="warning" className="mb-4">
            <strong>⚠️ Advertencia:</strong> {advertencia}
          </Alert>
        )}

        <Row className="g-4">
          {/* Formulario - Columna Izquierda */}
          <Col xs={12} lg={6}>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-4">Formulario</h4>
              
              <h5 className="mb-3">Entradas Numéricas</h5>
              
              <Form.Group className="mb-3">
                <Form.Label>Potencia del panel (W)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={potenciaPanelW}
                  onChange={(e) => setPotenciaPanelW(e.target.value)} 
                  placeholder="450"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cantidad de paneles</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={cantidadPaneles}
                  onChange={(e) => setCantidadPaneles(e.target.value)}
                  placeholder="10"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Inversor (precio)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={precioInversor}
                  onChange={(e) => setPrecioInversor(e.target.value)}
                  placeholder="800000"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Batería (precio unitaria)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={precioBateria}
                  onChange={(e) => setPrecioBateria(e.target.value)}
                  placeholder="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cantidad de baterías</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={cantidadBaterias}
                  onChange={(e) => setCantidadBaterias(e.target.value)}
                  placeholder="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Estructuras y cableado</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={precioEstructuras}
                  onChange={(e) => setPrecioEstructuras(e.target.value)}
                  placeholder="300000"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Instalación base</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={instalacionBase}
                  onChange={(e) => setInstalacionBase(e.target.value)}
                  placeholder="400000"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Peso envío (kg)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={pesoEnvioKg}
                  onChange={(e) => setPesoEnvioKg(e.target.value)}
                  placeholder="300"
                />
              </Form.Group>

              <h5 className="mb-3">Selects Obligatorios</h5>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de techo</Form.Label>
                <Form.Select value={tipoTecho} onChange={(e) => setTipoTecho(e.target.value)}>
                  <option value="teja">Teja/Asfalto (+5%)</option>
                  <option value="zinc">Zinc/Planchas (+2%)</option>
                  <option value="hormigon">Hormigón (+7%)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Región</Form.Label>
                <Form.Select value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="rm">RM ($5.000 base)</option>
                  <option value="norte">Norte ($9.000 base)</option>
                  <option value="sur">Sur ($10.000 base)</option>
                  <option value="austral">Austral ($15.000 base)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Complejidad de instalación</Form.Label>
                <Form.Select value={complejidadInstalacion} onChange={(e) => setComplejidadInstalacion(e.target.value)}>
                  <option value="baja">Baja (0%)</option>
                  <option value="media">Media (+8%)</option>
                  <option value="alta">Alta (+15%)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subsidio referencial</Form.Label>
                <Form.Select value={subsidio} onChange={(e) => setSubsidio(e.target.value)}>
                  <option value="sin">Sin subsidio (0%)</option>
                  <option value="residencial">Residencial (-8%)</option>
                  <option value="pyme">PyME (-5%)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Método de envío</Form.Label>
                <Form.Select value={metodoEnvio} onChange={(e) => setMetodoEnvio(e.target.value)}>
                  <option value="estandar">Estándar (1.0x)</option>
                  <option value="expres">Exprés (1.2x)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Garantía extendida</Form.Label>
                <Form.Select value={garantia} onChange={(e) => setGarantia(e.target.value)}>
                  <option value="12">12 meses (+2%)</option>
                  <option value="24">24 meses (+4%)</option>
                  <option value="36">36 meses (+6%)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Plan de pago</Form.Label>
                <Form.Select value={planPago} onChange={(e) => setPlanPago(e.target.value)}>
                  <option value="contado">Contado (0%)</option>
                  <option value="6">6 cuotas (1.2% mensual)</option>
                  <option value="12">12 cuotas (1.1% mensual)</option>
                  <option value="24">24 cuotas (1.0% mensual)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de pie</Form.Label>
                <Form.Select value={tipoPie} onChange={(e) => setTipoPie(e.target.value)}>
                  <option value="porcentaje">Porcentaje</option>
                  <option value="monto">Monto fijo</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  Valor pie {tipoPie === 'porcentaje' ? '(%)' : '($)'}
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={valorPie}
                  onChange={(e) => setValorPie(e.target.value)}
                  placeholder={tipoPie === 'porcentaje' ? '20' : '500000'}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button 
                  variant="danger" 
                  onClick={reiniciar}
                >
                  Reiniciar
                </Button>
              </div>
            </div>
          </Col>

          {/* Resultados - Columna Derecha (Sin cambios necesarios aquí) */}
          <Col xs={12} lg={6}>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-4">Resumen</h4>
              
              {resultados && (
                <>
                  <div className="mb-4 p-3 bg-light rounded">
                    <h5 className="mb-2">Potencia Estimada</h5>
                    <p className="h3 mb-0 text-primary">{resultados.potenciaEstimadaKW} kW</p>
                  </div>

                  <Table striped bordered hover responsive>
                    <tbody>
                      <tr>
                        <td><strong>Subtotal equipos</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.subtotalEquipos)}</td>
                      </tr>
                      <tr>
                        <td><strong>Recargo techo</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.recargoTecho)}</td>
                      </tr>
                      <tr>
                        <td><strong>Subsidio</strong></td>
                        <td className="text-end text-success">{formatearPrecio(resultados.montoSubsidio)}</td>
                      </tr>
                      <tr>
                        <td><strong>Instalación final</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.instalacionFinal)}</td>
                      </tr>
                      <tr>
                        <td><strong>IVA (19%)</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.iva)}</td>
                      </tr>
                      <tr>
                        <td><strong>Envío</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.costoEnvioFinal)}</td>
                      </tr>
                      <tr>
                        <td><strong>Garantía</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.montoGarantia)}</td>
                      </tr>
                      <tr className="table-primary">
                        <td><strong>Total antes de financiar</strong></td>
                        <td className="text-end"><strong>{formatearPrecio(resultados.totalAntesFinanciar)}</strong></td>
                      </tr>
                      <tr>
                        <td><strong>Pie</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.montoPie)}</td>
                      </tr>
                      <tr>
                        <td><strong>Interés total</strong></td>
                        <td className="text-end">{formatearPrecio(resultados.interesTotal)}</td>
                      </tr>
                      {resultados.numeroCuotas > 1 && (
                        <tr>
                          <td><strong>Cuota mensual ({resultados.numeroCuotas} cuotas)</strong></td>
                          <td className="text-end">{formatearPrecio(resultados.cuotaMensual)}</td>
                        </tr>
                      )}
                      <tr className="table-success">
                        <td><strong>Total final</strong></td>
                        <td className="text-end"><strong>{formatearPrecio(resultados.totalFinal)}</strong></td>
                      </tr>
                    </tbody>
                  </Table>

                  <div className="alert alert-info mt-3">
                    <small>
                      <strong>Nota:</strong> Valores referenciales que pueden ser personalizados en una 
                      evaluación presencial. Esta calculadora es una herramienta educativa.
                    </small>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CalculadoraIntegral;