import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { Row } from 'react-bootstrap';

interface Props {
    idPreference: string
}
function CheckoutMP({ idPreference }: Props) {

    //es la Public Key se utiliza generalmente en el frontend.
    initMercadoPago(import.meta.env.VITE_SOME_KEY, { locale: 'es-AR' });

    //redirectMode es optativo y puede ser self, blank o modal
    return (
        <Row className='mt-5'>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
            </div>

        </Row>

    );

}

export default CheckoutMP