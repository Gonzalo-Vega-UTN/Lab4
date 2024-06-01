import Carousel from 'react-bootstrap/Carousel';
import "../assets/slider.css"
import { useState, useEffect } from 'react';
import Instrumento from '../entities/Instrumento';
import { getTop5SelledInstrumentosFetch } from '../services/ApiInstrumentos';
import { Link, useNavigate } from 'react-router-dom';
function Slider() {

  const [instrumentos, setinstrumentos] = useState<Instrumento[]>([])
  const getInstrumentos = async () => {
    const instrumentos: Instrumento[] = await getTop5SelledInstrumentosFetch();
    setinstrumentos(instrumentos);
  }

  useEffect(() => {
    getInstrumentos();
  }, []);

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
      <div className="carousel-container">
        <Carousel>
          {instrumentos.map(instrumento => (
            <Carousel.Item key={instrumento.id} className='carousel_item' onClick={() => handleClick(instrumento.id)}>
            <img src={`/img/${instrumento.imagen}`} />
            <Carousel.Caption>
              <h3 className="text-white bg-dark">{instrumento.instrumento}</h3>
            </Carousel.Caption>
          </Carousel.Item>
          ))}
          
        </Carousel>
      </div>
    </>
  );
}

export default Slider;