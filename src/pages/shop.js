import React, { useState } from "react";

import { graphql } from "gatsby";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import get from "lodash/get";

import rootReducer from "../redux/reducers/rootReducer";

import { fetchProducts } from "../redux/actions/productActions";

import { accentFold } from "../helpers/utils";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopApp from "../components/ShopApp";

const Shop = ({ data, location }) => {
  //   console.log({ location });
  //   const { data } = props;

  let products = get(data, "allShopifyProduct.nodes");

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

  let searchText = "";

  if (location.search !== "") {
    const searchQuery = location.search.substring(1, location.search.length);

    products = products.filter((product) =>
      product.tags.some((tag) => tag === searchQuery)
    );
  } else if (location.state) {
    searchText = location.state;
    if (searchText && searchText.querySearch) {
      searchText = accentFold(searchText.querySearch).toUpperCase();

      products = products.filter((product) => {
        const title = accentFold(product.title).toUpperCase();
        return title.indexOf(searchText) > -1;
      });
    }
  }

  store.dispatch(fetchProducts(products));

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <ShopApp></ShopApp>
      </MarDeUranoApp>
    </Provider>
  );
};

export const query = graphql`
  query Products {
    allShopifyProduct(sort: { order: ASC, fields: title }) {
      nodes {
        id
        shopifyId
        title
        availableForSale
        description
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
          availableForSale
          title
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
  }
`;
export default Shop;
