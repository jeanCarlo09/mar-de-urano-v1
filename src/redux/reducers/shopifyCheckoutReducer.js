import Client from "shopify-buy";

import {
  INITIAL_CLIENT,
  ADD_TO_CHECKOUT,
} from "../actions/shopifyCheckoutAction";

const initState = {
  client: {},
  checkout: {},
  checkoutId: "",
};

const shopifyCheckoutReducer = (state = initState, action) => {
  switch (action.type) {
    case INITIAL_CLIENT:
      return {
        ...state,
        client: action.payload,
      };

    case ADD_TO_CHECKOUT:
      const checkout = addToCheckout(state, action.payload);

      return {
        ...state,
        checkout: checkout,
        checkoutId: checkout.id,
      };
    default:
      return state;
  }
};

const addToCheckout = async (state, item) => {
  //   const client = state.client;

  const client = Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  });

  let checkoutId = state.checkoutId || "";
  let checkout;

  console.log(checkoutId);

  if (checkoutId === "") {
    checkout = await client.checkout
      .create()
      .then(checkout => updateCheckout(client, checkout, item));
  } else {
    checkout = await client.checkout
      .fetch(checkoutId)
      .then(checkout => updateCheckout(client, checkout, item));
  }

  console.log(checkout);

  return checkout;
};

const updateCheckout = async (client, checkout, item) => {
  //   const client = state.client;

  const variantId = item.variants[0].shopifyId;

  const lineItemsToAdd = [
    {
      variantId,
      quantity: 1,
    },
  ];

  return client.checkout
    .addLineItems(checkout.id, lineItemsToAdd)
    .then(checkout => {
      console.log(checkout.lineItems);

      return checkout;
    });
};

export default shopifyCheckoutReducer;
