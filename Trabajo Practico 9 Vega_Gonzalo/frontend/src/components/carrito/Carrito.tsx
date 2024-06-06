import { useCarrito } from '../../hooks/useCarrito';
import { CartItem } from './CartItem';
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import { createPreferenceMP, savePedido } from '../../services/PedidoService';
import { Pedido } from '../../entities/Pedido';
import { PedidoDetalle } from '../../entities/PedidoDetalle';
import { useNavigate } from 'react-router-dom';
import CheckoutMP from './CheckoutMP';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import User from '../../entities/User';
import MySpinner from '../MySpinner';

export function Carrito() {
  const { cart, limpiarCarrito, totalPedido } = useCarrito();
  const [idPreference, setIdPreference] = useState<string>('');
  const { jsonUsuario } = useAuth();
  const usuarioLogueado: User | null = jsonUsuario ? JSON.parse(jsonUsuario) as User : null;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function formatDateToDDMMYYYY(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  const handleSave = async () => {
    setLoading(true);
    const total = calculateTotal();

    if (!usuarioLogueado || usuarioLogueado === null || usuarioLogueado.id === null) {
      navigate("/login")
      setLoading(false);
      return;
    }
    if (total > 0) {
      const pedido: Pedido = {
        id: -1,
        fechaPedido: formatDateToDDMMYYYY(new Date().toISOString().slice(0, 10)),
        totalPedido: total,
        pedidoDetalles: cart,
        userId: usuarioLogueado.id
      };
      const response = await savePedido(pedido);

      if (!response || response === null) {
        alert("Hubo un problema");
        setLoading(false);
        return;
      }
      const responseMP = await getPreferenceMP(pedido);
      console.log("RESPONSE MP", responseMP);
      if (responseMP) {
        setIdPreference(responseMP.id)
      }
    } else {
      alert("Agregue al menos un Instrumento al carrito");
    }
    setLoading(false);
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

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    handleSave();
    setShowModal(false);
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
          <Col><Button onClick={handleConfirm}>Comprar</Button></Col>
        </Row>
        <div className='mt-5 pl-5'>
          {loading ? <MySpinner /> : idPreference && <CheckoutMP preferenceId={idPreference}></CheckoutMP>}
        </div>

      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas realizar la compra?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleModalConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
