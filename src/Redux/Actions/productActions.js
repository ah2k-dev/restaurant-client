import { privateAPI, attachToken } from "../../Config/axiosConfig";
import swal from "sweetalert";
import { productConstants } from "../constants";

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
    try {
      const res = await privateAPI.get("/products");
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: res.data.products,
        });
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.post("/products", product);
      if (res.status === 200) {
        dispatch({
          type: productConstants.ADD_PRODUCT_SUCCESS,
          payload: res.data,
        });
        swal("Success", "Product Added Successfully", "success");
        dispatch(getAllProducts());
        return true;
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.delete(`/products/${id}`);
      if (res.status === 200) {
        dispatch({
          type: productConstants.DELETE_PRODUCT_SUCCESS,
          payload: id,
        });
        dispatch(getAllProducts());
        swal("Success", "Product Deleted Successfully", "success");
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
    try {
      await attachToken();
      const res = await privateAPI.put(`/products/${product._id}`, product);
      if (res.status === 200) {
        dispatch({
          type: productConstants.UPDATE_PRODUCT_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllProducts());
        swal("Success", "Product Updated Successfully", "success");
      }
    } catch (error) {
      swal("Error", error?.response?.data?.message || "Server Error", "error");
    }
  };
};
