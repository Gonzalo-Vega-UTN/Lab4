import Button from "react-bootstrap/esm/Button";
import type Instrumento from "../entities/Instrumento";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../hooks/useCarrito";
import { BsCartPlus, BsCartX } from "react-icons/bs";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import User from "../entities/User";
import { useState } from "react";

type InstrumentoProps = {
  instrumento: Instrumento;
};
const PublicacionIntrumento = ({ instrumento }: InstrumentoProps) => {

  const [jsonUser, setJSONUser] = useState<any>(sessionStorage.getItem('user'));
  const userLogueado: User = JSON.parse(jsonUser) as User;


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
  const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito()

  const verificarInstrumentoCarrito = (product: Instrumento) => {
    const flag = cart.some(item => String(item.instrumento.id) == String(product.id));
    return flag;
  }

  const isInstrumentoCarrito = verificarInstrumentoCarrito(instrumento)


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
            <div className="col-md-4  d-flex justify-content-center align-items-center">
              <img src={instrumento.imagen.includes("www") ? instrumento.imagen : `/img/${instrumento.imagen}`}  className="card-img " style={{ width: "100%", height: "250px", objectFit: "fill" }} />
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

              {userLogueado && <div className="mt-3">
                <Button variant="none"><CiSquareMinus size={30} className="m-2" onClick={() => removeItemCarrito(instrumento)} /></Button>
                <Button variant="outline-secondary"
                  onClick={() => {
                    isInstrumentoCarrito
                      ? removeCarrito(instrumento)
                      : addCarrito(instrumento)
                  }}
                >
                  {
                    isInstrumentoCarrito
                      ? <BsCartX title="Quitar" size={30} />
                      : <BsCartPlus title="Comprar" size={30} />
                  }
                </Button>
                <Button variant="none" ><CiSquarePlus size={30} className="m-2" onClick={() => addCarrito(instrumento)} /></Button>


              </div>}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default PublicacionIntrumento;

