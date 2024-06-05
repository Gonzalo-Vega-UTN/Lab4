import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Instrumento from "../entities/Instrumento";
import { deleteInstrumentoById, getInstrumentosFetch } from "../services/ApiInstrumentos";
import { useNavigate } from "react-router-dom";
import MyAlert from "../components/MyAlert";
import { useAuth } from "../context/AuthContext";
import User from "../entities/User";

const GestionInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([])
  const { jsonUsuario } = useAuth();
  const usuarioLogueado: User | null = jsonUsuario ? JSON.parse(jsonUsuario) as User : null;

  const getInstrumentos = async () => {
    const instrumentos: Instrumento[] = await getInstrumentosFetch((usuarioLogueado && usuarioLogueado.email) ? usuarioLogueado.email : "");
    setInstrumentos(instrumentos);
  }

  useEffect(() => {
    getInstrumentos();
  }, []);


  const navigate = useNavigate();
  const handleClickModificar = (id: string): void => {
    if (isNaN(Number(id))) {
      navigate('/error');
    } else {
      navigate(`/instrumento-form/${id}`);
    }
  };
  const [showConfirmationAlertId, setShowConfirmationAlertId] = useState<string | null>(null);

  const handleClickEliminar = (id: string): void => {
    setShowConfirmationAlertId(id);
  };

  const handleConfirmDelete = async (id: string) => {
    const instrumentoToUpdate = instrumentos.find(instrumento => instrumento.id === id);

    if (instrumentoToUpdate) {
      const updatedInstrumentos = instrumentos.map(instrumento => {
        if (instrumento.id === id) {
          return { ...instrumento, alta: !instrumento.alta }; // Toggle alta
        }
        return instrumento;
      });
      await deleteInstrumentoById(id)
      setInstrumentos(updatedInstrumentos);
    }

    setShowConfirmationAlertId(null);
  };

  const handleClickGenerarPdf = () =>{
    
  }
  return (
    <>
      <h1 className="display-2">Gestion Instrumentos</h1>
      <div>
        <Button className="p-3 mb-3 mx-1" style={{ fontSize: '1.2em', fontWeight: 'bold' }} onClick={() => handleClickModificar("0")}>Crear</Button>
        <Button variant="warning" className="p-3 mb-3 mx-1" style={{ fontSize: '1.2em', fontWeight: 'bold' }} onClick={() => handleClickGenerarPdf()}>Generar Pdf</Button>
      </div>

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Modelo</th>
            <th scope="col">Marca</th>
            <th scope="col">Precio</th>
            <th scope="col">Modificar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {instrumentos.map(instrumento => (
            <tr className={instrumento.alta ? "table-light" : "table-danger"} key={instrumento.id}>
              <th scope="row">{instrumento.id}</th>
              <td>{instrumento.instrumento}</td>
              <td>{instrumento.modelo}</td>
              <td>{instrumento.marca}</td>
              <td>{instrumento.precio}</td>
              <td><Button onClick={() => handleClickModificar(instrumento.id)}>Modificar</Button></td>
              <td>
                <Button
                  className={instrumento.alta ? "btn-danger" : "btn-success"}
                  onClick={() => handleClickEliminar(instrumento.id)}
                >
                  {instrumento.alta ? "Dar de Baja" : "Dar de Alta"}
                </Button>

                {showConfirmationAlertId === instrumento.id && (
                  <MyAlert
                    show={true}
                    handleClose={() => setShowConfirmationAlertId(null)}
                    handleConfirm={() => handleConfirmDelete(instrumento.id)}
                    message={(instrumento.alta ? "¿Está seguro de dar de BAJA a " : "Está seguro de dar de ALTA a ") + ` "${instrumento.instrumento}"`}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GestionInstrumentos;