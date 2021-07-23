import { types } from "../../types/types";

// export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: types.fetchProductsSuccess,
  payload: products,
});

// fetch products
export const fetchProducts = products => {
  return dispatch => {
    dispatch(fetchProductsSuccess(products));
  };
};

export const fetchProductSingle = (product) => {
  return dispatch => {
    dispatch({
      type: types.fetchProductSingle,
      payload: product
    });
  };
}
