import React, { useState, useEffect } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../redux/reducers/rootReducer';
import get from 'lodash/get';
import parse from 'html-react-parser';

import MarDeUranoApp from '../components/MarDeUranoApp';
import ShopLayout from '../components/layouts/ShopLayout';
import { graphql } from 'gatsby';
import IdeologyCards from '../components/our-world/IdeologyCards';

const OurWorld = ({ data }) => {

  let store;

  const ourWorldContent = get(data, 'allContentfulOurWorld.nodes')[0];
  const ideologyCards = get(ourWorldContent, 'ideologyCards');

  console.log('ourWorldContent', ourWorldContent);

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
          <div className="shop-area pt-95 pb-100">
            <div className="container-fluid our-world">
              <div className="row about-us">
                <div className="col-10 order-2 order-lg-1 col-lg-5 about-us-img">
                  <img
                    className="img-fluid"
                    src={ourWorldContent.aboutUsImage.fluid.src}
                    alt=""
                  />
                </div>
                <div className="col-12 col-lg-7 order-1 order-lg-2 about-us-content mb-30">
                  <h2 className="text-center mb-20 our-world-title">ABOUT US</h2>

                  {parse(`${ourWorldContent.aboutUsDescription.childMarkdownRemark.html}`)}

                </div>
              </div>
              <div className="row mt-5 ideology">

                <div className="col-12 text-center mt-2 mb-4 ideology-title">
                  <h2>IDEOLOGY</h2>
                </div>

                <div className="col-lg-6 col-sm-12 mb-20 ideology-content">
                  {parse(`${ourWorldContent.ideologyDescription.childMarkdownRemark.html}`)}

                  <div className="tags row">

                    <div className="col-md-4 col-sm-5 tags-item">
                      <div className="tags-item-content">Wearable</div>
                    </div>
                    <div className="col-md-5 col-sm-7 tags-item">
                      <div className="tags-item-content">Art</div>
                    </div>
                    <div className="col-md-3 col-sm-7 tags-item">
                      <span className="tags-item-content">Ethical</span>
                    </div>
                    <div className="col-md-5 col-sm-5 tags-item">
                      <span className="tags-item-content">Sustainable</span>
                    </div>
                    <div className="col-md-3 col-sm-5 tags-item">
                      <span className="tags-item-content">Affordable</span>
                    </div>
                    <div className="col-md-4 col-sm-7 tags-item">
                      <span className="tags-item-content">Timeless</span>
                    </div>
                    <div className="col-md-3 col-sm-7 tags-item">
                      <span className="tags-item-content">High Quality</span>
                    </div>
                    <div className="col-md-4 col-sm-5 tags-item">
                      <span className="tags-item-content">Unique</span>
                    </div>
                    <div className="col-md-5 tags-item">
                      <span className="tags-item-content">Slow Fashion</span>
                    </div>
                  </div>

                </div>

                <div className="col-lg-6 col-sm-12 ideology-img">

                  <img
                    className="img-fluid"
                    src={ourWorldContent.ideologyImage.fluid.src}
                    alt=""
                  />
                </div>

              </div>
              <div className="mt-5 ideology-cards">
                <div className="row">

                  {
                    ideologyCards.map((card, key) => (
                      <IdeologyCards key={key} card={card}></IdeologyCards>
                    ))
                  }

                </div>
              </div>
              <div className="row mt-5"></div>
            </div>
          </div>
        </ShopLayout>
      </MarDeUranoApp>
    </Provider>
  );
};


export const query = graphql`
  query ourWorld {

    allContentfulOurWorld {
      nodes {
        aboutUsDescription {
          childMarkdownRemark {
            html
          }
        }
        aboutUsImage {
          fluid(quality: 100) {
            src
          }
        }
        ideologyDescription {
          childMarkdownRemark {
            html
          }
        }
        ideologyImage {
          fluid(quality: 100) {
            src
          }
        }
        ideologyCards {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }

  }
`;



export default OurWorld;