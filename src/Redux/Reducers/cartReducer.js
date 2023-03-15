import { cartConstants } from "../constants";

const initialState = {
  cartItems: {},
  shippingAddress: "",
  length: 0,
  total: 0,
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      console.log(action.payload);

      if (state.cartItems[action.payload._id]) {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [action.payload._id]: {
              ...state.cartItems[action.payload._id],
              quantity: state.cartItems[action.payload._id].quantity + 1,
              totalPrice:
                state.cartItems[action.payload._id].totalPrice +
                action.payload.price,
            },
          },
          length: state.length + 1,
          total: state.total + action.payload.price,
        };
      } else {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [action.payload._id]: {
              ...action.payload,
              quantity: 1,
              totalPrice: action.payload.price,
            },
          },
          length: state.length + 1,
          total: state.total + action.payload.price,
        };
      }
    case cartConstants.REMOVE_CART_ITEM:
        console.log(action.payload)
      if (state.cartItems[action.payload].quantity > 1) {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [action.payload]: {
              ...state.cartItems[action.payload],
              quantity: state.cartItems[action.payload].quantity - 1,
              totalPrice:
                state.cartItems[action.payload].totalPrice -
                state.cartItems[action.payload].price,
            },
          },
          length: state.length - 1,
          total: state.total - state.cartItems[action.payload].price,
        };
      } else {
        const { [action.payload]: value, ...newCartItems } = state.cartItems;
        return {
          ...state,
          cartItems: newCartItems,
          length: state.length - 1,
          total: state.total - state.cartItems[action.payload].price,
        };
      }
    case cartConstants.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case cartConstants.RESET_CART:
      return {
        ...state,
        cartItems: [],
        length: 0,
        total: 0,
      };
    default:
      return state;
  }
};
