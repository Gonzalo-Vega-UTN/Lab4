import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { PedidoDetalle } from '../entities/PedidoDetalle';
import Instrumento from '../entities/Instrumento';

interface CartContextType {
  cart: PedidoDetalle[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
  totalPedido: number;
}

// Crear el contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => { },
  removeCarrito: () => { },
  removeItemCarrito: () => { },
  limpiarCarrito: () => { },
  totalPedido: 0
});

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<PedidoDetalle[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);

  useEffect(() => {
    calcularTotalCarrito();
  }, [cart]);

  const addCarrito = (product: Instrumento) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.instrumento.id === product.id);
      if (itemIndex === -1) {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        return [...prevCart, { id: null, cantidad: 1, instrumento: product }];
      } else {
        // Si el producto ya está en el carrito, incrementamos su cantidad
        const newCart = [...prevCart];
        newCart[itemIndex].cantidad += 1;
        return newCart;
      }
    });
  };

  const removeCarrito = (product: Instrumento) => {
    setCart(prevCart => prevCart.filter(detalle => detalle.instrumento.id !== product.id));
  };

  const removeItemCarrito = (product: Instrumento) => {
    setCart(prevCart => {
      const newCart = prevCart.map(detalle => {
        if (detalle.instrumento.id === product.id) {
          if (detalle.cantidad > 1) {
            return { ...detalle, cantidad: detalle.cantidad - 1 };
          }
          return null;
        }
        return detalle;
      }).filter(detalle => detalle !== null) as PedidoDetalle[];
      return newCart;
    });
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const calcularTotalCarrito = () => {
    const total = cart.reduce((acc: number, item: PedidoDetalle) => {
      let subtotal = item.cantidad * Number(item.instrumento.precio);
      if (item.instrumento.costoEnvio !== "G") {
        subtotal += Number(item.instrumento.costoEnvio);
      }
      return acc + subtotal;
    }, 0);
    setTotalPedido(total);
  };

  return (
    <CartContext.Provider value={{ cart, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito, totalPedido }}>
      {children}
    </CartContext.Provider>
  );
};
