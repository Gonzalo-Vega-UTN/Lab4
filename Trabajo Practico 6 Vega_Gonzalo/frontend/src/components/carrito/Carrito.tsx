import React from 'react';
import { useCarrito } from '../../hooks/useCarrito';
import { CartItem } from './CartItem'; // Asegúrate de que la importación sea correcta
import { Button, Container, Row } from 'react-bootstrap';
import { savePedido } from '../../services/PedidoService';
import { Pedido } from '../../entities/Pedido';
import Instrumento from '../../entities/Instrumento';
import { PedidoDetalle } from '../../entities/PedidoDetalle';
import { useNavigate } from 'react-router-dom';

export function Carrito() {
  const { cart, removeCarrito, addCarrito, limpiarCarrito } = useCarrito();

  const mostrarCarritoJSON = () => {
    console.log(cart);
    
  }
  const navigate = useNavigate();

  const handleSave = () => {

    const save = async () => {
      const total = cart.reduce((acc: number, item: PedidoDetalle) => acc + (item.cantidad * Number(item.instrumento.precio)), 0)

      const pedido: Pedido = {
        id: null,
        fechaPedido: null,
        totalPedido: total,
        pedidoDetalles: cart
      }
      console.log(pedido);

      await savePedido(pedido)

      limpiarCarrito();
    }
    save()


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
                // addCarrito={() => addCarrito(detalle.instrumento)}
                />
              ))}
            </ul>

            <button onClick={limpiarCarrito} title='Limpiar Todo'>Limpiar</button>
            <button onClick={mostrarCarritoJSON}>MOSTRAR CART JSON</button>
          </aside>
        </Row>
        <Row className='mt-4'>
          <Button onClick={handleSave}>Comprar</Button>

        </Row>
      </Container>
    </>
  );
}
