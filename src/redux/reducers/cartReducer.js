import uuid from "uuid/v4";

import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from "../actions/cartActions";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
    if (product.variants === undefined) {
      const cartItem = cartItems.filter(
        item => item.shopifyId === product.shopifyId
      )[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: product.shopifyId,
            uuid: uuid(),
          },
        ];
      } else {
        return cartItems.map(item =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              }
            : item
        );
      }
    } else {
      const cartItem = cartItems.filter(item => {
        return (
          item.shopifyId === product.shopifyId &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          product.selectedProductMaterial &&
          product.selectedProductMaterial === item.selectedProductMaterial &&
          (product.shopifyId ? product.shopifyId === item.shopifyId : true)
        );
      })[0];

      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: product.shopifyId,
            uuid: uuid(),
          },
        ];
      } else if (
        cartItem !== undefined &&
        (cartItem.selectedProductColor !== product.selectedProductColor ||
          cartItem.selectedProductSize !== product.selectedProductSize ||
          cartItem.selectedProductMaterial !== product.selectedProductMaterial)
      ) {
        console.log("cartItem !== undefined", cartItem);

        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: product.shopifyId,
          },
        ];
      } else {
        return cartItems.map(item =>
          item.shopifyId === cartItem.shopifyId &&
          cartItem.selectedProductColor === item.selectedProductColor &&
          cartItem.selectedProductSize === item.selectedProductSize &&
          cartItem.selectedProductMaterial === item.selectedProductMaterial
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize,
                selectedProductMaterial: product.selectedProductMaterial,
              }
            : item
        );
      }
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          cartItem => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(cartItem => cartItem.uuid !== product.uuid);
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter(item => {
      return false;
    });
  }

  return state;
};

export default cartReducer;
