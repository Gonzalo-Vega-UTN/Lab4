import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface MyAlertProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  message? : string;
}

const MyAlert: React.FC<MyAlertProps> = ({ show, handleClose, handleConfirm, message = "¿Desear continuar?" }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación Requerida</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyAlert;
