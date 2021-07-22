import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import { Link } from "gatsby";

import rootReducer from "../redux/reducers/rootReducer";

import MarDeUranoApp from "../components/MarDeUranoApp";
import ShopLayout from "../components/layouts/ShopLayout";

const Blog = ({ data, location }) => {
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
                <div className="col-12 d-flex justify-content-start align-items-stretch flex-wrap">
                  {/* Card 1 */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="card p-0">
                      <img
                        className="card-img-top"
                        src={require("../assets/images/misma1.png")}
                        alt="Card image cap"
                      />

                      <div className="card-body">
                        <h5 className="card-title">
                          NEW WEBSITE & BLOG LAUNCH!
                        </h5>
                        <h6 className="card-title">10/10/2020</h6>
                        <p className="card-text">
                          Welcome to our new website and blog! <br />
                          <br />
                          We are super excited to finally share with you this
                          new space where you will be able to learn more about
                          the brand and purchase the products you love very
                          easy!
                          <br />
                          <br />
                          Thank you so much for supporting us so far. We could
                          not have done this without you! <br />
                          <br />
                          With love,
                          <br />
                          <br />
                          Mar de Urano
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="card p-0">
                      <img
                        className="card-img-top"
                        src={require("../assets/images/misma2.png")}
                        alt="Card image cap"
                      />

                      <div className="card-body">
                        <h5 className="card-title">
                          MITO. A poem that tells you more about this painting.
                        </h5>
                        <h6 className="card-title">11/11/2020</h6>
                        <p className="card-text">
                          Mito de creación <br />
                          <br />
                          Seres de prisma <br />
                          Gran Sol <br />
                          El primer Quetzal Guacamaya
                          <br /> Del fuego y del agua
                          <br /> Mito de creación Maya
                          <br /> En movimiento <br />
                          Serpiente Jaguar
                          <br /> Al pie del volcán me acompaña
                          <br /> El alma dividida al bailar
                          <br /> Entre el Quetzal de montaña y<br /> La
                          Guacamaya Del Mar...
                        </p>
                      </div>
                    </div>
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

export default Blog;
