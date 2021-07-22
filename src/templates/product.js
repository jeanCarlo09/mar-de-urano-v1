import React from "react";

import { graphql } from "gatsby";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import get from "lodash/get";
import { save, load } from "redux-localstorage-simple";

import rootReducer from "../redux/reducers/rootReducer";

import { fetchProducts } from "../redux/actions/productActions";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopProduct from "../components/ShopProduct";

const Shop = ({ data }) => {
  const product = get(data, "shopifyProduct");

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
  store.dispatch(fetchProducts([product]));

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <ShopProduct></ShopProduct>
      </MarDeUranoApp>
    </Provider>
  );
};

export const query = graphql`
  query Product($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      shopifyId
      title
      availableForSale
      descriptionHtml
      handle
      publishedAt
      tags
      priceRange {
        minVariantPrice {
          currencyCode
          amount
        }
        maxVariantPrice {
          currencyCode
          amount
        }
      }
      variants {
        shopifyId
        title
        availableForSale
        selectedOptions {
          name
          value
        }
      }
      images {
        localFile {
          childImageSharp {
            fixed(width: 600, height: 800) {
              src
            }
          }
        }
      }
    }
  }
`;
export default Shop;
