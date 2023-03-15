import { cartConstants } from "../constants";

export const addItem = (item) => {
  return {
    type: cartConstants.ADD_TO_CART,
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: cartConstants.REMOVE_CART_ITEM,
    payload: item,
  };
};

export const saveShippingAddress = (address) => {
  return {
    type: cartConstants.SAVE_SHIPPING_ADDRESS,
    payload: address,
  };
};

export const resetCart = () => {
  return {
    type: cartConstants.RESET_CART,
  };
};
