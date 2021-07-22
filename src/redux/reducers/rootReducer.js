import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import collectionReducer from "./collectionReducer";
import blogReducer from "./blogReducer";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  collectionData: collectionReducer,
  blogData: blogReducer
});

export default rootReducer;
