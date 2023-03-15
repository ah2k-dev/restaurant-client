import { authConstants } from "../constants";

const initialState = {
  loading: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  verifyEmail: false,
};
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
    case authConstants.REGISTER_REQUEST:
    case authConstants.FORGOT_PASSWORD_REQUEST:
    case authConstants.RESET_PASSWORD_REQUEST:
    case authConstants.EMAILTOKEN_REQUEST:
    case authConstants.LOGOUT_REQUEST:
    case authConstants.VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case authConstants.SET_VERIFY_EMAIL:
      return {
        ...state,
        verifyEmail: action.payload,
      };

    case authConstants.REGISTER_SUCCESS:
    case authConstants.FORGOT_PASSWORD_SUCCESS:
    case authConstants.RESET_PASSWORD_SUCCESS:
    case authConstants.EMAILTOKEN_SUCCESS:
    case authConstants.LOGOUT_SUCCESS:
    case authConstants.VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
