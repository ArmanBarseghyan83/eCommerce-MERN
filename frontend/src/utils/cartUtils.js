export const updateCart = (state) => {
  // Calculate the items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Calculate the shipping price
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  // Calculate the tax price
  state.taxPrice = (0.15 * state.itemsPrice).toFixed(2);

  // Calculate the total price
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
