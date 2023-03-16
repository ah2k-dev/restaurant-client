import { privateAPI, attachToken } from "../../Config/axiosConfig";
import swal from "sweetalert";
import { orderConstants } from "../constants";

export const createOrder = (order, type) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.ADD_ORDER_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.post("/order", order);
      if (res.status === 200) {
        dispatch({
          type: orderConstants.ADD_ORDER_SUCCESS,
        });
        swal("Success", "Order Created Successfully", "success");
        if (type === "admin") {
          dispatch(getAllOrders());
        } else {
          dispatch(getCustomerOrders());
        }
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const getCustomerOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.get("/order/myorders");
      if (res.status === 200) {
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: res.data.orders,
        });
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ALL_ORDERS_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.get("/order");
      if (res.status === 200) {
        dispatch({
          type: orderConstants.GET_ALL_ORDERS_SUCCESS,
          payload: res.data.orders,
        });
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const cancelOrder = (id, type) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.CANCEL_ORDER_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.put(`/order/cancel/${id}`);
      if (res.status === 200) {
        dispatch({
          type: orderConstants.CANCEL_ORDER_SUCCESS,
        });
        swal("Success", "Order Cancelled Successfully", "success");
        if (type === "admin") {
          dispatch(getAllOrders());
        } else {
          dispatch(getCustomerOrders());
        }
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const updateOrder = (id, order, type) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.put(`/order/${id}`, order);
      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_ORDER_SUCCESS,
        });
        swal("Success", "Order Updated Successfully", "success");
        if (type == "admin") {
          console.log("admin");
          dispatch(getAllOrders());
        } else {
          dispatch(getCustomerOrders());
        }
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const deleteOrder = (id, type) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.DELETE_ORDER_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.delete(`/order/${id}`);
      if (res.status === 200) {
        dispatch({
          type: orderConstants.DELETE_ORDER_SUCCESS,
        });
        swal("Success", "Order Deleted Successfully", "success");
        if (type === "admin") {
          dispatch(getAllOrders());
        } else {
          dispatch(getCustomerOrders());
        }
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};
