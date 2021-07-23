import { types } from "../../types/types";


const initState = {
  products: [],
  productActive: {}
};

const productReducer = (state = initState, action) => {


  switch (action.type) {
    case types.fetchProductsSuccess:
      return {
        ...state,
        products: action.payload,
        productActive: {}
      };

    case types.fetchProductSingle:
      return {
        ...state,
        productActive: action.payload
      }

    default:
      return state;

  }

};


export default productReducer;
