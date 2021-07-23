import React from "react";

import { graphql } from "gatsby";
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import get from "lodash/get";
import { save, load } from "redux-localstorage-simple";

import rootReducer from "../redux/reducers/rootReducer";

import { fetchProducts, fetchProductSingle } from "../redux/actions/productActions";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopProduct from "../components/ShopProduct";
import { getProductsOutCustom } from "../helpers/product";

const Shop = ({ data }) => {


  const product = get(data, "shopifyProduct");

  let relatedProducts = getProductsOutCustom(get(data, "allShopifyProduct.nodes"));

  const print = product.productType === 'Custom' ? get(data, 'allContentfulPrintCustom.nodes') : [];

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

  store.dispatch(fetchProductSingle({ product: [product], relatedProducts }));

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <ShopProduct print={print}></ShopProduct>
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
      productType
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
        image {
          localFile {
            childImageSharp {
              fixed {
                src
              }
            }
          }
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
        productType
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

    allContentfulPrintCustom {
      nodes {
        printId
        image {
          fixed(width: 80, height: 80) {
            src
          }
        }
      }
    }
  }
`;
export default Shop;
