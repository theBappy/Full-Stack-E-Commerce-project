import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists in the cart
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedCartItems;
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        updatedCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Item does not exist, add to cart
        updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      const updatedTotalPrice = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalItems: updatedCartItems.length,
        totalPrice: updatedTotalPrice,
      };

    case 'REMOVE_FROM_CART':
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      const newTotalPrice = filteredItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cartItems: filteredItems,
        totalItems: filteredItems.length,
        totalPrice: newTotalPrice,
      };

    case 'UPDATE_ITEM_QUANTITY':
      const updatedItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const totalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cartItems: updatedItems,
        totalPrice,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });

  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });

  return (
    <CartContext.Provider
      value={{ 
        cartItems: state.cartItems, 
        totalItems: state.totalItems, 
        totalPrice: state.totalPrice, 
        addToCart, 
        removeFromCart, 
        updateItemQuantity 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

