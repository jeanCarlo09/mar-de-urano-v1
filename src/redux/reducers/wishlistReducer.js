// import {
//   ADD_TO_WISHLIST,
//   DELETE_FROM_WISHLIST,
//   DELETE_ALL_FROM_WISHLIST,
// } from "../actions/wishlistActions";

import { types } from "../../types/types";

const initState = [];

const wishlistReducer = (state = initState, action) => {
  const wishlistItems = state,
    product = action.payload;

  switch (action.type) {

    case types.addToWishList:

      const wishlistItem = wishlistItems.filter(
        item => item.id === product.shopifyId
      )[0];
      if (wishlistItem === undefined) {
        return [...wishlistItems, product];
      } else {
        return wishlistItems;
      }

    case types.deleteFromWishList:

      const remainingItems = (wishlistItems, product) =>
        wishlistItems.filter(wishlistItem => wishlistItem.id !== product.shopifyId);
      return remainingItems(wishlistItems, product);

    case types.deleteAllFromWishList:

      return wishlistItems.filter(item => {
        return false;
      });

    default:
      return wishlistItems;
  }

  // if (action.type === ADD_TO_WISHLIST) {
  //   const wishlistItem = wishlistItems.filter(
  //     item => item.id === product.shopifyId
  //   )[0];
  //   if (wishlistItem === undefined) {
  //     return [...wishlistItems, product];
  //   } else {
  //     return wishlistItems;
  //   }
  // }

  // if (action.type === DELETE_FROM_WISHLIST) {
  //   const remainingItems = (wishlistItems, product) =>
  //     wishlistItems.filter(wishlistItem => wishlistItem.id !== product.shopifyId);
  //   return remainingItems(wishlistItems, product);
  // }

  // if (action.type === DELETE_ALL_FROM_WISHLIST) {
  //   return wishlistItems.filter(item => {
  //     return false;
  //   });
  // }

  // return wishlistItems;
};

export default wishlistReducer;
