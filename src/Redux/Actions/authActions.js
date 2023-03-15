import { authConstants } from "../constants";
import { publicAPI, privateAPI, attachToken } from "../../Config/axiosConfig";
import swal from "sweetalert";
export const register = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.REGISTER_REQUEST });
    try {
      const res = await publicAPI.post("/auth/register", user);
      if (res.status === 200) {
        dispatch({
          type: authConstants.REGISTER_SUCCESS,
        });
        swal("Success", "User Registered Successfully", "success");
        dispatch(requestEmailToken({ email: user.email }));
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await publicAPI.post("/auth/login", user);
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: user,
        });
        swal("Success", "User Logged In Successfully", "success");
      }
    } catch (error) {
      if (error?.response?.data?.emailVerify) {
        swal(
          "Error",
          error?.response?.data?.message || "Server Error",
          "error"
        );
        dispatch({
          type: authConstants.SET_VERIFY_EMAIL,
          payload: true,
        });
      }
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const requestEmailToken = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.EMAILTOKEN_REQUEST });
    try {
      const res = await publicAPI.post("/auth/requestEmailToken", data);
      if (res.status === 200) {
        dispatch({
          type: authConstants.EMAILTOKEN_SUCCESS,
        });
        swal("Success", "Token Sent Successfully", "success");
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const verifyEmail = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.VERIFY_REQUEST });
    try {
      const res = await publicAPI.post("/auth/verifyEmail", data);
      if (res.status === 200) {
        dispatch({
          type: authConstants.VERIFY_SUCCESS,
        });
        swal("Success", "Email Verified Successfully", "success");
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.FORGOT_PASSWORD_REQUEST });
    try {
      const res = await publicAPI.post("/auth/forgotPassword", email);
      if (res.status === 200) {
        dispatch({
          type: authConstants.FORGOT_PASSWORD_SUCCESS,
        });
        swal("Success", "Token Sent Successfully", "success");
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const resetPassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.RESET_PASSWORD_REQUEST });
    try {
      const res = await publicAPI.post("/auth/resetPassword", data);
      if (res.status === 200) {
        dispatch({
          type: authConstants.RESET_PASSWORD_SUCCESS,
        });
        swal("Success", "Password Reset Successfully", "success");
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.get("/auth/logout");
      if (res.status === 200) {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGOUT_SUCCESS,
        });
        swal("Success", "User Logged Out Successfully", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};
