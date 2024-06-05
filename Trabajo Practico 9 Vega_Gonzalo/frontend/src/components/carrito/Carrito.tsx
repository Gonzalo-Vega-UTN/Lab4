import { useCarrito } from '../../hooks/useCarrito';
import { CartItem } from './CartItem';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { createPreferenceMP, savePedido } from '../../services/PedidoService';
import { Pedido } from '../../entities/Pedido';
import { PedidoDetalle } from '../../entities/PedidoDetalle';
import { useNavigate } from 'react-router-dom';
import CheckoutMP from './CheckoutMP';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import User from '../../entities/User';

export function Carrito() {
  const { cart, limpiarCarrito, totalPedido } = useCarrito();
  const [idPreference, setIdPreference] = useState<string>('');
  const { jsonUsuario } = useAuth();
  const usuarioLogueado: User | null = jsonUsuario ? JSON.parse(jsonUsuario) as User : null;

  const navigate = useNavigate();

  function formatDateToDDMMYYYY(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  const handleSave = async () => {
    const total = calculateTotal();

    if (!usuarioLogueado || usuarioLogueado === null || usuarioLogueado.id === null) {
      navigate("/login")
      return
    }
    if (total > 0) {
      const pedido: Pedido = {
        id: -1,
        fechaPedido: formatDateToDDMMYYYY(new Date().toISOString().slice(0, 10)),
        totalPedido: total,
        pedidoDetalles: cart,
        userId: usuarioLogueado.id
      };
      console.log("ANTES DE ENVIAR", pedido);
      const response = await savePedido(pedido)
      console.log("RESPONSE PEDIDO", response);

      if (!response || response === null) {
        alert("hubo un problema")
        return;
      }
      console.log("AAAAAAAAAA");

      const responseMP = await getPreferenceMP(pedido)
      console.log("RESPONSE MP", responseMP);
      if (responseMP) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${responseMP.id}`;

      }

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
      return response;
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
          {totalPedido == 0 ? "" : <p>Total con Envío: $ {totalPedido}</p>}
        </Row>
        <Row className='mt-3'>
          <Col><Button className='' variant='secondary' onClick={limpiarCarrito} title='Limpiar Todo'>Limpiar</Button></Col>
          <Col><Button onClick={handleSave}>Comprar</Button></Col>
        </Row>
        {idPreference && <CheckoutMP preferenceId={idPreference}></CheckoutMP>}
      </Container>
    </>
  );
}
