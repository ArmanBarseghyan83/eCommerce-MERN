import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id
            ? {
                ...x,
                qty:
                  x.qty + item.qty <= item.countInStock
                    ? x.qty + item.qty
                    : item.countInStock,
              }
            : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    changeQty: (state, action) => {
      const item = action.payload;

      state.cartItems = state.cartItems.map((x) =>
        x._id === item._id ? item : x
      );
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState)
  },
});

// For use in dispatch() functions
export const {
  addToCart,
  removeFromCart,
  changeQty,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart
} = cartSlice.actions;

// For use in store.js
export default cartSlice.reducer;
