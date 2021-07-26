import uuid from "uuid/v4";
import { equalsItems } from "../../helpers/product";

import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  INCREASE_QUANTITY
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
          item.shopifyId === product.shopifyId
          && equalsItems(item, product)
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
        // } else if (
        //   ((cartItem.selectedProductColor ? cartItem.selectedProductColor !== product.selectedProductColor : false) ||
        //     cartItem.selectedProductSize !== product.selectedProductSize ||
        //     cartItem.selectedProductMaterial !== product.selectedProductMaterial)
        // ) {
        //   return [
        //     ...cartItems,
        //     {
        //       ...product,
        //       quantity: product.quantity ? product.quantity : 1,
        //       cartItemId: product.shopifyId,
        //     },
        //   ];
      } else {

        if (cartItem.quantity >= 6) {
          return state;
        }

        return cartItems.map(item =>
          item.shopifyId === cartItem.shopifyId
            && equalsItems(item, product)
            ? {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1,
              selectedProductColor: product.selectedProductColor,
              selectedProductSize: product.selectedProductSize,
              selectedProductMaterial: product.selectedProductMaterial,
              selectedProductPrint: product.selectedProductPrint
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
          cartItem => cartItem.cartItemId === product.cartItemId ? !equalsItems(cartItem, product) : true
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          && equalsItems(item, product)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === INCREASE_QUANTITY) {
    if (product.quantity <= 6) {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          && equalsItems(item, product)
          ? { ...item, quantity: item.quantity + 1 }
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
