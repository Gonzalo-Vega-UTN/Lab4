import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Instrumento from "../entities/Instrumento";
import { deleteInstrumentoById, getInstrumentosFetch } from "../services/ApiInstrumentos";
import { useNavigate } from "react-router-dom";
import MyAlert from "../components/MyAlert";

export const GestionInstrumentos = () => {
  const [instrumentos, setinstrumentos] = useState<Instrumento[]>([])

  const getInstrumentos = async () => {
    const instrumentos: Instrumento[] = await getInstrumentosFetch();
    setinstrumentos(instrumentos);
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
    console.log(`Calling API to delete item with id: ${id}`);
    await deleteInstrumentoById(id);
    setShowConfirmationAlertId(null);
    setinstrumentos(instrumentos.filter(instrumento => instrumento.id !== id))

  };

  return (
    <>
      <h1 className="display-2">Gestion Instrumentos</h1>
      <div><Button className="p-3 mb-3 mx-1" style={{ fontSize: '1.2em', fontWeight: 'bold' }} onClick={() => handleClickModificar("0")}>Crear</Button></div>
      <table className="table table-striped table-dark">
        <thead>
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
            <tr key={instrumento.id}>
              <th scope="row">{instrumento.id}</th>
              <td>{instrumento.instrumento}</td>
              <td>{instrumento.modelo}</td>
              <td>{instrumento.marca}</td>
              <td>{instrumento.precio}</td>
              <td><Button onClick={() => handleClickModificar(instrumento.id)}>Modificar</Button></td>
              <td>
                <Button
                  className="btn-danger"
                  onClick={() => handleClickEliminar(instrumento.id)}
                >
                  Eliminar
                </Button>
                {showConfirmationAlertId === instrumento.id && (
                  <MyAlert
                    show={true}
                    handleClose={() => setShowConfirmationAlertId(null)}
                    handleConfirm={() => handleConfirmDelete(instrumento.id)}
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
