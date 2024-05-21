import { useEffect, useState } from 'react';
import Instrumento from '../entities/Instrumento';
import { getInstrumentosFetch } from '../services/ApiInstrumentos';
import PublicacionInstrumento from './PublicacionInstrumento';

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
   <div className="instrumento-list">
      {instrumentos.map(instrumento => (
        <PublicacionInstrumento key={instrumento.id} instrumento={instrumento} />
      ))}
    </div>
    </>
  )
}

export default ListadoPublicacion