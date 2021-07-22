import Client from "shopify-buy";

export const INITIAL_CLIENT = "INITIAL_CLIENT";
export const CREATE_CHECKOUT = "CREATE_CHECKOUT";
export const UPDATE_CHECKOUT = "UPDATE_CHECKOUT";

export const ADD_TO_CHECKOUT = "ADD_TO_CHECKOUT";

const createShopifyClientSuccess = client => ({
  type: INITIAL_CLIENT,
  payload: client,
});

export const createShopifyClient = () => {
  return async dispatch => {
    const client = await Client.buildClient({
      storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
      domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
    });
    dispatch(createShopifyClientSuccess(client));
  };
};

export const addToCheckout = item => {
  return async dispatch => {
    dispatch({
      type: ADD_TO_CHECKOUT,
      payload: item,
    });
  };
};
