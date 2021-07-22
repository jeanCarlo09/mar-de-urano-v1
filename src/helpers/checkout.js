import Client from "shopify-buy";

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
});

const isBrowser = typeof window !== "undefined";

export const handleCheckout = (cartData) => {
  let lineItems = cartData.map((item) => {
    const variant = item.variants.filter((variante) => {
      //   if (
      //     item.selectedProductColor !== null &&
      //     item.selectedProductSize !== null &&
      //     item.selectedProductMaterial !== null
      //   ) {
      return (
        (item.selectedProductColor === null ||
          variante.color === item.selectedProductColor) &&
        (item.selectedProductSize === null ||
          variante.size === item.selectedProductSize) &&
        (item.selectedProductMaterial === null ||
          variante.material === item.selectedProductMaterial)
      );
      //   }

      //   return true;
    });

    return {
      variantId: variant[0] ? variant[0].shopifyId : 0,
      quantity: item.quantity,
    };
  });

  const existingCheckoutID = isBrowser
    ? localStorage.getItem("shopify_checkout_id")
    : null;

  const createNewCheckout = () =>
    client.checkout
      .create()
      .then((checkout) => {
        localStorage.setItem("shopify_checkout_id", checkout.id);
        return addLinesToCheckout(checkout.id, lineItems);
      })
      .catch((err) => console.log(err));

  const fetchCheckout = (id) =>
    client.checkout
      .fetch(id)
      .then((checkout) => {
        const lineItemsToRemove = checkout.lineItems.map((item) => item.id);

        return client.checkout
          .removeLineItems(id, lineItemsToRemove)
          .then((checkoutRes) => addLinesToCheckout(checkoutRes.id, lineItems));
      })
      .catch((err) => console.log(err));

  if (existingCheckoutID) {
    try {
      fetchCheckout(existingCheckoutID);
    } catch (e) {
      localStorage.setItem("shopify_checkout_id", null);
    }
  } else {
    createNewCheckout();
  }
};

const addLinesToCheckout = (checkoutId, lineItems) => {
  client.checkout
    .addLineItems(checkoutId, lineItems)
    .then((checkout) => {
      goToCheckout(checkout);
    })
    .catch((err) => console.log(err));
};

const goToCheckout = (checkout) => {
  if (typeof window !== `undefined`) {
    window.open(checkout.webUrl, "_self");
  }
};
