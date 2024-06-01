import { useEffect, useState } from 'react';
import Instrumento from '../entities/Instrumento';
import { getInstrumentosFetch } from '../services/ApiInstrumentos';
import PublicacionInstrumento from './PublicacionInstrumento';
import { Container, Row, Col } from 'react-bootstrap';
import { Carrito } from './carrito/Carrito';
import User from '../entities/User';

function ListadoPublicacion() {
  const [jsonUser, setJSONUser] = useState<any>(sessionStorage.getItem('user'));
  const userLogueado: User = JSON.parse(jsonUser) as User;

  const [instrumentos, setinstrumentos] = useState<Instrumento[]>([]);
  const getInstrumentos = async () => {
    const instrumentos: Instrumento[] = await getInstrumentosFetch();
    setinstrumentos(instrumentos);
  };


  useEffect(() => {
    getInstrumentos();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <div className="instrumento-list">
              {instrumentos.map((instrumento) => (
                <PublicacionInstrumento key={instrumento.id} instrumento={instrumento} />
              ))}
            </div>
          </Col>
          {userLogueado && <Col sm={4}>
            <Carrito />
          </Col>}
        </Row>
      </Container>
    </>
  );
}

export default ListadoPublicacion;
