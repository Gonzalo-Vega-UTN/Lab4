import { useCarrito } from '../../hooks/useCarrito';
import { CartItem } from './CartItem';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { createPreferenceMP, savePedido } from '../../services/PedidoService';
import { Pedido } from '../../entities/Pedido';
import { PedidoDetalle } from '../../entities/PedidoDetalle';
import { useNavigate } from 'react-router-dom';
import CheckoutMP from './CheckoutMP';
import { useState } from 'react';

export function Carrito() {
  const { cart, limpiarCarrito, totalPedido } = useCarrito();
  const [idPreference, setIdPreference] = useState<string>('');

  const navigate = useNavigate();

  const handleSave = async () => {
    const total = calculateTotal();
    if (total > 0) {
      const pedido: Pedido = {
        id: -1,
        fechaPedidoString: new Date().toISOString().slice(0, 10),
        totalPedido: total,
        pedidoDetalles: cart
      };
      console.log("ANTES DE ENVIAR", pedido);
      
      await Promise.all([savePedido(pedido), getPreferenceMP(pedido)]);
    } else {
      alert("Agregue al menos un Instrumento al carrito");
    }
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc: number, item: PedidoDetalle) => {
      let subtotal = item.cantidad * Number(item.instrumento.precio);

      if (item.instrumento.costoEnvio !== "G") {
        subtotal += Number(item.instrumento.costoEnvio);
      }
      return acc + subtotal;
    }, 0);
    return total;
  };

  const getPreferenceMP = async (pedido: Pedido) => {
    const total = calculateTotal();
    if (total > 0) {
      const response = await createPreferenceMP(pedido);
      console.log("Preference id: " + response.id);
      if (response) setIdPreference(response.id);
    } else {
      alert("Agregue al menos un Instrumento al carrito");
    }
  };

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
