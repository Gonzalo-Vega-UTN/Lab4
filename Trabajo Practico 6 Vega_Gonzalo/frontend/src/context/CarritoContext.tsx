import React, { createContext, useState, ReactNode, useContext } from 'react';
import { PedidoDetalle } from '../entities/PedidoDetalle';
import Instrumento from '../entities/Instrumento';



interface CartContextType {
  cart: PedidoDetalle[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
}



// Crear el contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {}
});

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<PedidoDetalle[]>([]);

  const addCarrito = async (product: Instrumento) => {
    let pedidoDetalle: PedidoDetalle;
  
    if (!cart.some(item => item.instrumento.id === product.id)) {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      pedidoDetalle = {
        id: null,
        cantidad: 1,
        instrumento: product
      };
      setCart(prevCart => [...prevCart, pedidoDetalle]);
    } else {
      // Si el producto ya está en el carrito, incrementamos su cantidad
      pedidoDetalle = cart.find(item => item.instrumento.id === product.id)!;
      pedidoDetalle.cantidad += 1;
      setCart(prevCart => [...prevCart]); // No necesitas spread en setCart
    }
  };

  const removeCarrito = async (product: Instrumento) => {
    setCart(prevCart => prevCart.filter(detalle => detalle.instrumento.id !== product.id));
  };

  const removeItemCarrito = async (product: Instrumento) => {
    setCart(prevCart => {
      return prevCart.map(detalle => {
        if (detalle.instrumento.id === product.id) {
          if (detalle.cantidad > 1) {
            return { ...detalle, cantidad: detalle.cantidad - 1 };
          }
          return null;
        }
        return detalle;
      }).filter(detalle => detalle !== null) as PedidoDetalle[];
    });
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};