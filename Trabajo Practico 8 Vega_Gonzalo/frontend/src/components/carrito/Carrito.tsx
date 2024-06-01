import { useCarrito } from '../../hooks/useCarrito';
import { CartItem } from './CartItem'; // Asegúrate de que la importación sea correcta
import { Button, Col, Container, Row } from 'react-bootstrap';
import { createPreferenceMP, savePedido } from '../../services/PedidoService';
import { Pedido } from '../../entities/Pedido';
import { PedidoDetalle } from '../../entities/PedidoDetalle';
import { useNavigate } from 'react-router-dom';
import CheckoutMP from './CheckoutMP';
import PreferenceMP from '../../entities/PreferenceMP';
import { useState } from 'react';

export function Carrito() {
  const { cart, limpiarCarrito, totalPedido } = useCarrito();
  const [idPreference, setIdPreference] = useState<string>('');

  const mostrarCarritoJSON = () => {
    console.log(cart);

  }
  const navigate = useNavigate();


  const getPreferenceMP = async () => {
    const total = cart.reduce((acc: number, item: PedidoDetalle) => acc + (item.cantidad * Number(item.instrumento.precio)), 0)

    if (total > 0) {
      const pedido: Pedido = {
        id: null,
        fechaPedido: null,
        totalPedido: total,
        pedidoDetalles: cart
      }
      const response: PreferenceMP = await createPreferenceMP(pedido);
      console.log("Preference id: " + response.id);
      if (response)
        setIdPreference(response.id);
    } else {
      alert("Agregue al menos un plato al carrito");
    }

  }
 
  const save = async () => {

    const total = cart.reduce((acc: number, item: PedidoDetalle) => acc + (item.cantidad * Number(item.instrumento.precio)), 0)
    console.log(total);
    
    if (total > 0) {
      const pedido: Pedido = {
        id: null,
        fechaPedido: null,
        totalPedido: total,
        pedidoDetalles: cart
      }
      console.log(pedido);

      await savePedido(pedido)
    } else {
      alert("Agregue al menos un plato al carrito");
    }
  }
  const handleSave = () => {
    save()
    getPreferenceMP()

  }
  return (
    <>
      <Container>
        <Row>
          <label className='cart-button'>
            <i>Items del Pedido</i>
            <hr></hr>
          </label>

          <aside className='cart'>
            <ul>
              {cart.map((detalle, index) => (
                <CartItem
                  key={index}
                  item={detalle.instrumento}
                  cantidad={detalle.cantidad}
                />
              ))}
            </ul>

            {/* <button onClick={mostrarCarritoJSON}>MOSTRAR CART JSON</button> */}
          </aside>
        </Row>
        <Row>
          {totalPedido == 0 ? "" : <p>$ {totalPedido}</p>}
        </Row>
        <Row className='mt-3'>
          <Col><Button className='' variant='secondary' onClick={limpiarCarrito} title='Limpiar Todo'>Limpiar</Button></Col>
          <Col><Button onClick={handleSave}>Comprar</Button></Col>

        </Row>

        {idPreference && <CheckoutMP idPreference={idPreference}></CheckoutMP>}

      </Container>
    </>
  );
}
