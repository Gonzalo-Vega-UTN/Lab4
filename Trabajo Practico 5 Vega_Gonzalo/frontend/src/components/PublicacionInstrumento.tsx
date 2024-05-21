import Button from "react-bootstrap/esm/Button";
import type Instrumento from "../entities/Instrumento";
import { useNavigate } from "react-router-dom";

type InstrumentoProps = {
  instrumento: Instrumento;
};
const PublicacionIntrumento = ({ instrumento }: InstrumentoProps) => {
  let textoEnvio = "",
    textColor = "";
  if (instrumento.costoEnvio == "G") {
    textoEnvio = "Envio Gratis a todo el país";
    textColor = "text-success";
  } else {
    textoEnvio =
      "Costo de Envio al interior de Argentina $" + instrumento.costoEnvio;
    textColor = "text-warning";

  }
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    if (isNaN(Number(id))) {
      navigate('/error'); 
    } else {
      navigate(`/detalle/${id}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={`/img/${instrumento.imagen}`} className="card-img" />
            </div>
            <div className="col-md-8">
              <div className="card-body text-left">
                <h3 className="card-title">{instrumento.instrumento}</h3>
                <h4 className="card-text">
                  <strong className="">$ {instrumento.precio}</strong>
                </h4>
                <p className="card-text text-warning">
                  <small className={textColor}>{textoEnvio}</small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Unidades Vendidas: {instrumento.cantidadVendida}
                  </small>
                </p>
              </div>
              <Button variant="outline-primary" onClick={() => handleClick(instrumento.id)}>Ver Detalles</Button>{''}

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default PublicacionIntrumento;
