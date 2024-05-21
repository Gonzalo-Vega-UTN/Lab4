import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Instrumento from '../entities/Instrumento';
import { getInstrumentoXIdFetch } from '../services/ApiInstrumentos';


function DetalleInstrumento() {
    
    const {idInstrumento} = useParams();
    
    const [instrumento, setinstrumento] = useState<Instrumento>();
    const getinstrumento = async () => {
        const instrumentoSelect: Instrumento = await getInstrumentoXIdFetch(Number(idInstrumento));
        setinstrumento(instrumentoSelect);
    }
    useEffect(() => {
        getinstrumento();
    }, []);


    let textoEnvio = "",
    textColor = "";
  if (instrumento?.costoEnvio == "G") {
    textoEnvio = "Envio Gratis a todo el país";
    textColor = "text-success";
  } else {
    textoEnvio =
      "Costo de Envio al interior de Argentina $" + instrumento?.costoEnvio;
    textColor = "text-warning";

  }
  const imagen = "/img/" + instrumento?.imagen
  
  return (
    <>
   <div className="container">
        <div className="row">
            <div className="col-md-6">
            <img src={imagen} className="card-img" />
                <div>
                    <h3>Descripcion</h3>
                    <p>{instrumento?.descripcion}</p>
                </div>
               
            </div>
            <div className="col-md-6">
                <p><i>{instrumento?.cantidadVendida} vendidos</i></p>
                <h2>{instrumento?.instrumento}</h2>
                <p>$  {instrumento?.precio}</p>
                <ul >
                    <li >Marca : {instrumento?.marca}</li>
                    <li >Modelo: {instrumento?.modelo}</li>
                </ul>

                <div>
                    <h3>Costo Envío</h3>
                    <p className={textColor}>{textoEnvio}</p>
                </div>
              
                <a href="#" className="btn btn-primary">Agregar al carrito</a>
            </div>
        </div>
    </div>
    </>
  )
}

export default DetalleInstrumento;
