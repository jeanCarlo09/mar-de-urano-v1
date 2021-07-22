import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../redux/reducers/rootReducer";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopLayout from "../components/layouts/ShopLayout";

const NewPage = ({ data, location }) => {
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
          <div className="shop-area pt-95 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src={require("../assets/images/our-world1.jpg")}
                    alt=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-5">
                  <h2 className="text-center">NEW WEBSITE & BLOG LAUNCH!</h2>
                  <p className="text-center">
                    <time>10/10/2020</time>
                  </p>
                  <br />
                  <p>
                    Born in the tropical paradise of Costa Rica. Mar de Urano
                    becomes obsessed with the concept of freedom of expression
                    by creating timeless, original, flattering pieces using
                    carefully selected conscious fibers and transmuting oil
                    paintings into textile design.
                  </p>{" "}
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
              <div className="row mt-5">
                <div className="col-12 text-center">
                  <h2>IDEOLOGY</h2>
                  <br />
                  <p>
                    Conscious living and freedom of expression is what Mar De
                    Urano strives for. We project ourselves as a brand that uses
                    art as a tool for empowerment and activism. All of our
                    collections are created with love, ethical standards,
                    respect for our team and the planet we live in.
                  </p>
                  <p>
                    Wearable Art-Ethical-Sustainable-Affordable-Timeless-High
                    Quality- Unique-Slow Fashion
                  </p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 col-sm-6">
                  <h2 className="text-center">ART</h2>
                  <p>
                    Every single one of our prints comes from an oil painting
                    from Ramiro's studio called Estudio Libre Expresion.
                  </p>
                  <h2 className="text-center mt-5">TEXTILES</h2>
                  <p>
                    Every textile we use is carefully selected to ensure
                    sustainability and high quality. We use either recycled,
                    regenerated, organic or natural fibers. Some of the brands
                    we use are: ECONYL®, REPREVE®.
                  </p>
                  <h2 className="text-center mt-5">ZERO WASTE</h2>
                  <p>
                    Our batches of production are small to avoid excessive
                    waste. We save all of our fabric trims and give them a new
                    life. We do fabric scrunchies, new bikinis or meditation
                    cushions. That way 0% of our fabric is wasted.
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <img
                    className="img-fluid"
                    src={require("../assets/images/our-world2.jpg")}
                    alt=""
                  />
                  <h2 className="text-center mt-5">PRODUCTION</h2>
                  <p>
                    All of our pieces are designed, cut, and sewn in Costa Rica.
                    Everything is handmade. We work with men and women operated
                    manufacturers who respect fair wage practices. We outsource
                    to local families that have the possibility of sewing from
                    their own home. We base our supply chain in a shared economy
                    so that there is space for everybody to grow.
                  </p>
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

export default NewPage;
