import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../redux/reducers/rootReducer";
import get from "lodash/get";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopLayout from "../components/layouts/ShopLayout";
import { graphql } from "gatsby";
import { IdeologyCards } from "../components/our-world/ideologyCards";

const OurWorld = ({ data }) => {

  let store;

  const ideologyCards = get(data, 'allContentfulIdeologyCards.nodes');

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
                    src={require("../assets/images/our-world1.jpg")}
                    alt=""
                  />
                </div>
                <div className="col-12 col-lg-7 order-1 order-lg-2 about-us-content mb-30">
                  <h2 className="text-center mb-20 our-world-title">ABOUT US</h2>

                  <p>
                    Born in the tropical paradise of Costa Rica. Mar de Urano
                    becomes obsessed with the concept of freedom of expression
                    by creating timeless, original, flattering pieces using
                    carefully selected conscious fibers and transmuting oil
                    paintings into textile design.
                  </p>
                  <p>
                    A couple of lovers from the tropics started Mar De Urano in
                    2018 in the skirts of the Poas Volcano. Karen is the
                    designer and Ramiro is the artist. Together they have been
                    inspired by Costa Rica and their life experiences around the
                    world to create the brand. They focus on expressing their
                    art in an authentic way that allows them to connect deeply
                    with the present time. The principles behind them are to
                    empower ourselves through art, share the feeling of freedom
                    while dressing in an unique way. Concerned about the current
                    world situation related to the fashion industry their design
                    process is textile focused using only recycled, regenerated,
                    and organic fabrics. Every piece is cut with functionality
                    and quality in mind. Having a shared economy and zero waste
                    practices are at their core. Mar De Urano designs for the
                    men and the women that believe in challenging the status quo
                    by their daily actions including the way they dress. They
                    design for the people that work, travel, and that find
                    freedom of expression in the dance that life is. Living in
                    the cold mountains and the hot beaches of Costa Rica is how
                    Rami and Karen divide their time and Mar De Urano is defined
                    by the juxtaposition of this lifestyle in the tropics.
                  </p>
                </div>
              </div>
              <div className="row mt-5 ideology">

                <div className="col-12 text-center mt-2 mb-4 ideology-title">
                  <h2>IDEOLOGY</h2>
                </div>

                <div className="col-lg-6 col-sm-12 mb-20 ideology-content">


                  <p className="ideology-content-description">
                    Conscious living and freedom of expression is what Mar De
                    Urano strives for. We project ourselves as a brand that uses
                    art as a tool for empowerment and activism. All of our
                    collections are created with love, ethical standards,
                    respect for our team and the planet we live in.
                  </p>
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
                    src={require("../assets/images/our-world2.jpg")}
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
    allContentfulIdeologyCards(sort: { fields: order }) {
      nodes {
        title
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

export default OurWorld;