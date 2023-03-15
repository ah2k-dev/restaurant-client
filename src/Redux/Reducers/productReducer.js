import { productConstants } from "../constants";

const initialState = {
  loading: false,
  products: [],
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_REQUEST:
    case productConstants.ADD_PRODUCT_REQUEST:
    case productConstants.DELETE_PRODUCT_REQUEST:
    case productConstants.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case productConstants.ADD_PRODUCT_SUCCESS:
    case productConstants.UPDATE_PRODUCT_SUCCESS:
    case productConstants.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
