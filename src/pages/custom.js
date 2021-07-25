import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";

import MarDeUranoApp from '../components/MarDeUranoApp';
import CustomApp from '../components/CustomApp';
import { graphql } from 'gatsby';
import { getProductsWithCustom } from '../helpers/product';
import { get } from 'lodash';
import { fetchProducts } from '../redux/actions/productActions';

const Custom = ({ data, location }) => {

  const sliderData = get(data, 'allContentfulSliderCustomPage.nodes')[0];
  const nodes = get(data, "allShopifyProduct.nodes");
  let products = getProductsWithCustom(nodes);

  if (location.search !== "") {
    const custom = location.search.substring(1, location.search.length).split('-');
    products = products.filter((product) =>
      product.tags.some((tag) => tag === custom[1])
    );
  }

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

  store.dispatch(fetchProducts(products));

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <CustomApp relatedProducts={nodes.slice(0, 4)} sliderData={sliderData}></CustomApp>
      </MarDeUranoApp>
    </Provider>
  );
}

export const query = graphql`
  query ProductsCustom {
    allShopifyProduct(sort: { order: ASC, fields: title }) {
      nodes {
        id
        shopifyId
        title
        availableForSale
        description
        handle
        publishedAt
        productType 
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

    allContentfulSliderCustomPage {
      nodes {
        title
        subTitle
        description
        url
        textButton
        imageSlider {
          fluid(maxWidth: 1920, quality: 80) {
            src
          }
        }
      }
    }
  }
`;



export default Custom;