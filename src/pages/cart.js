import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../redux/reducers/rootReducer";

import { fetchProducts } from "../redux/actions/productActions";

import MarDeUranoApp from "../components/MarDeUranoApp";
import Cart from "../components/Cart";
import ShopLayout from "../components/layouts/ShopLayout";

const CartPage = () => {
  let store;

  if (typeof window !== `undefined`) {
    store = createStore(
      rootReducer,
      load(),
      composeWithDevTools(applyMiddleware(thunk, save()))
    );
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }

  store.dispatch(fetchProducts([]));

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <ShopLayout headerTop="visible">
          <Cart />
        </ShopLayout>
      </MarDeUranoApp>
    </Provider>
  );
};

export default CartPage;
