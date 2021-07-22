import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import { Link } from "gatsby";

import rootReducer from "../redux/reducers/rootReducer";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopLayout from "../components/layouts/ShopLayout";

const NotFound = ({ data, location }) => {
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

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <ShopLayout headerTop="visible">
          <div className="error-area pt-40 pb-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8 text-center">
                  <div className="error">
                    <h1>404</h1>
                    <h2>OPPS! PAGE NOT FOUND</h2>
                    <p>
                      Sorry but the page you are looking for does not exist,
                      have been removed, name changed or is temporarity
                      unavailable.
                    </p>

                    <Link to={"/shop"} className="error-btn">
                      Back to shop page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ShopLayout>
      </MarDeUranoApp>
    </Provider>
  );
};

export default NotFound;
