import { orderConstants } from "../constants";

const initialState = {
  orders: [],
  loading: false,
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
    case orderConstants.ADD_ORDER_REQUEST:
    case orderConstants.CANCEL_ORDER_REQUEST:
    case orderConstants.DELETE_ORDER_REQUEST:
    case orderConstants.UPDATE_ORDER_REQUEST:
    case orderConstants.GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
    case orderConstants.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case orderConstants.ADD_ORDER_SUCCESS:
    case orderConstants.CANCEL_ORDER_SUCCESS:
    case orderConstants.DELETE_ORDER_SUCCESS:
    case orderConstants.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
