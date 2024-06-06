import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Instrumento from '../entities/Instrumento';
import { getInstrumentoXIdFetch } from '../services/ApiInstrumentos';
import { useCarrito } from '../hooks/useCarrito';
import { Button } from 'react-bootstrap';
import User from '../entities/User';
import ReporteService from '../services/ReporteService';
import { Role } from '../entities/Role';

function DetalleInstrumento() {
  const { idInstrumento } = useParams();
  const navigate = useNavigate();

  const [jsonUser, setJSONUser] = useState<any>(sessionStorage.getItem('user'));
  const userLogueado: User = JSON.parse(jsonUser) as User;

  const [instrumento, setinstrumento] = useState<Instrumento>();
  const [isComprado, setIsComprado] = useState<boolean>(true);
  const [errorPdf, setErrorPdf] = useState("");

  const getInstrumento = async () => {
    try {
      const instrumentoSelect: Instrumento = await getInstrumentoXIdFetch(Number(idInstrumento));
      setinstrumento(instrumentoSelect);

    } catch (error) {
      navigate("/error")
    }
  };

  useEffect(() => {
    getInstrumento();
  }, []);

  const { addCarrito, removeCarrito } = useCarrito();

  const handleClick = () => {
    if (instrumento && isComprado) {
      addCarrito(instrumento);
      setIsComprado(false);
    } else if (instrumento) {
      removeCarrito(instrumento);
      setIsComprado(true);
    }
  };

  let textoEnvio = "";
  let textColor = "";
  if (instrumento) {
    if (instrumento.costoEnvio === "G") {
      textoEnvio = "Envio Gratis a todo el país";
      textColor = "text-success";
    } else {
      textoEnvio = `Costo de Envio al interior de Argentina $${instrumento.costoEnvio}`;
      textColor = "text-warning";
    }
  }

  const renderImage = () => {
    if (instrumento) {
      if (instrumento.imagen.includes("www") || instrumento.imagen.includes("http")) {
        return <img src={instrumento.imagen} className="card-img" alt="Instrumento" />;
      } else {
        return <img src={`/img/${instrumento.imagen}`} className="card-img" alt="Instrumento" />;
      }
    }
    return null;
  };

  const handleClickGenerarPdf = async (idInstrumento: string) => {
    try {
      const pdfData = await ReporteService.generatePdfReport(idInstrumento);
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error('Error al generar el Excel:', error);
      if (error instanceof Error) {
        setErrorPdf(error.message);
      } else {
        setErrorPdf('Hubo un error');
      }
    }
  }

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6">
          {renderImage()}
          <div>
            <h3>Descripcion</h3>
            <p>{instrumento?.descripcion}</p>
          </div>
        </div>
        <div className="col-md-6 mt-5 border border-dark p-5 rounded shadow">
          <p className='h4 text-primary'>Unidades Vendidas: <i>{instrumento?.cantidadVendida}</i></p>
          <h2>{instrumento?.instrumento}</h2>
          <p>$ {instrumento?.precio}</p>
          <ul >
            <li >Marca : {instrumento?.marca}</li>
            <li >Modelo: {instrumento?.modelo}</li>
          </ul>

          <div>
            <h3>Costo Envío</h3>
            <p className={textColor}>{textoEnvio}</p>
          </div>

          {userLogueado ? (
            instrumento ? (
              isComprado ? (
                <Button variant="primary" href="#" onClick={handleClick}>Agregar al carrito</Button>
              ) : (
                <Button variant="secondary" href="#" onClick={handleClick}>Eliminar de carrito</Button>
              )
            ) : null
          ) : (
            <div className='d-flex justify-content-around align-items-center'>
              <span className='lead'>Inicia sesión para comprar este producto</span>
              <Button size='lg' variant="primary" href="#" onClick={() => navigate("/login")}>Login</Button>
            </div>
          )}
        </div>
        {userLogueado && userLogueado.role === Role.ADMIN && instrumento &&
          <Button className='mt-5' size='lg' variant="success" href="#" onClick={() => handleClickGenerarPdf(instrumento.id)}>Generar PDF</Button>}
        {errorPdf && <p>{errorPdf}</p>}
      </div>
    </div>
  );
}

export default DetalleInstrumento;
