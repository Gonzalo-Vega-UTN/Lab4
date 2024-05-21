import { useEffect, useState } from 'react';
import Instrumento from '../entities/Instrumento';
import { getInstrumentosFetch } from '../services/ApiInstrumentos';
import PublicacionInstrumento from './PublicacionInstrumento';
import { Container, Row, Col } from 'react-bootstrap';
import { CartItem } from './carrito/CartItem';
import { Carrito } from './carrito/Carrito';
import { CartProvider } from '../context/CarritoContext';

function ListadoPublicacion() {
  const [instrumentos, setinstrumentos] = useState<Instrumento[]>([])
  const getInstrumentos = async () => {
    const instrumentos: Instrumento[] = await getInstrumentosFetch();
    setinstrumentos(instrumentos);
  }

  useEffect(() => {
    getInstrumentos();
  }, []);
  return (
    <>
      <CartProvider>
        <Container fluid>
          <Row>
            <Col sm={8}>
              <div className="instrumento-list">
                {instrumentos.map(instrumento => (
                  <PublicacionInstrumento key={instrumento.id} instrumento={instrumento} />
                ))}
              </div>
            </Col>
            <Col sm={4}>
              <Carrito />
            </Col>
          </Row>
        </Container>
      </CartProvider>
    </>
  )
}

export default ListadoPublicacion