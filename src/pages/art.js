import React from "react";

import { Link, graphql } from "gatsby";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import get from "lodash/get";

import rootReducer from "../redux/reducers/rootReducer";

import { fetchProducts } from "../redux/actions/productActions";

import MarDeUranoApp from "../components/MarDeUranoApp";

const Art = ({ data }) => {
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
        <div className="m-5">
          <Link to="/" className="text-underline">
            back
          </Link>
          <h1>Art</h1>
        </div>
      </MarDeUranoApp>
    </Provider>
  );
};

export default Art;
