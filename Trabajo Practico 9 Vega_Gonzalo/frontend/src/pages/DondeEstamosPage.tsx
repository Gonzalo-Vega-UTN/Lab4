import { Container } from 'react-bootstrap';
import Mapa from '../components/Mapa';

const DondeEstamosPage = () => {
    return (
        <>
            <Container>
                <h2 className='mt-2'>¡Encuéntranos!</h2>

                <p>
                    Estamos ubicados convenientemente en Calle San Martín y Las Heras, a solo 5 minutos de la plaza independencia en Mendoza Ciudad.
                </p>
                <Mapa />
            </Container>
        </>
    );
};

export default DondeEstamosPage;
