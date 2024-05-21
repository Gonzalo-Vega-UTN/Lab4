
import React from 'react';

const ErrorComp: React.FC = () => {
  return (
    <div className="ErrorComp-container">
      <h1>ErrorComp!</h1>
      <p>El articulo buscado no es válido</p>
      <p>Por favor ingresa un identificador valido</p>
    </div>
  );
};

export default ErrorComp;
