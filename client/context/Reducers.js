import { setCookie } from "../cookie/cookie";
const CARD = "CARD";

const addShoppingCart = (state, data) => {
  const { cart } = state;

  const isExisted = cart.some((item) => item.id === data.id);
  if (isExisted) {
    cart.forEach((item) => {
      if (item.id === data.id) {
        item.amount += data.amount;
      }
      return item;
    });
  } else {
    cart.push(data);
  }
  setCookie(CARD, cart);
  return cart;
};

const removeProductFromCart = (state,productId) => {
  const { cart } = state;
  const updatedCart = [...cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);
  updatedCart.splice(updatedItemIndex, 1);
  setCookie(CARD, updatedCart);
  return updatedCart;
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      state = { cart: addShoppingCart(state, action.payload) };
      return state;
    case "REMOVE_TO_CART":
      state = { cart:removeProductFromCart(state,action.payload.productId)};
      return state;
    default:
      return state;
  }
};