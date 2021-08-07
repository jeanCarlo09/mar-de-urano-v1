import { types } from "../../types/types";
// import { ADD_TO_COMPARE, DELETE_FROM_COMPARE } from "../actions/compareActions";

const initState = [];

const compareReducer = (state = initState, action) => {
  const compareItems = state,
    product = action.payload;

  switch (action.type) {

    case types.addToCompare:

      const compareItem = compareItems.filter(item => item.id === product.shopifyId)[0];
      if (compareItem === undefined) {
        return [...compareItems, product];
      } else {
        return compareItems;
      }

    case types.deleteFromCompare:

      const remainingItems = (compareItems, product) =>
        compareItems.filter(compareItem => compareItem.id !== product.shopifyId);
      return remainingItems(compareItems, product);

    default:

      return compareItems;

  }

  // if (action.type === ADD_TO_COMPARE) {
  //   const compareItem = compareItems.filter(item => item.id === product.shopifyId)[0];
  //   if (compareItem === undefined) {
  //     return [...compareItems, product];
  //   } else {
  //     return compareItems;
  //   }
  // }

  // if (action.type === DELETE_FROM_COMPARE) {
  //   const remainingItems = (compareItems, product) =>
  //     compareItems.filter(compareItem => compareItem.id !== product.shopifyId);
  //   return remainingItems(compareItems, product);
  // }

  // return compareItems;
};

export default compareReducer;
