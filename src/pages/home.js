import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { SectionsContainer, Section, Header } from "react-fullpage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import get from "lodash/get";

import rootReducer from "../redux/reducers/rootReducer";

import MarDeUranoApp from "../components/MarDeUranoApp";
import HeaderApp from "../wrappers/header/HeaderApp";
import ShopLayout from "../components/layouts/ShopLayout";

const Home = ({ data }) => {
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

  const anchors = [];

  const sliderData = get(data, "allContentfulHomeSlider.nodes");

  sliderData.forEach((element) => {
    anchors.push(element.slug);
  });

  const logoHeader = get(data, "contentfulInformacionDelSitio.logo.fixed.src");

  const options = {
    activeClass: "active",
    anchors: anchors,
    arrowNavigation: false,
    className: "SectionsContainer",
    sectionClassName: "Section",
    delay: 1000,
    navigation: true,
    scrollBar: false,
    sectionPaddingTop: "0",
    sectionPaddingBottom: "0",
    verticalAlign: true,
  };

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <ShopLayout headerTop="visible">
          <Fragment>
            <div className="fullpage-slider-wrapper">
              <Header>
                <HeaderApp
                  logo={logoHeader}
                  layout="container-fluid"
                  headerPaddingClass="header-padding-1"
                  headerBgClass="bg-white"
                />
              </Header>
              <SectionsContainer {...options} className="bg-gray-7">
                {sliderData &&
                  sliderData.length > 0 &&
                  sliderData.map((single, key) => {
                    const banner = get(single, "banner.fixed.src");

                    return (
                      <div
                        key={key}
                        className="section-background-image"
                        style={{ backgroundImage: `url(${banner})` }}
                      >
                        <Section>
                          <div className="slider-section flone-fp-section">
                            <div className="container">
                              <div className="row fullpage-slider-wrap-mrg">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center">
                                  <div className="slider-content-11 slider-animated-1 fullpage-slider-mrg fullpage-content">
                                    <h3 className="animated text-white">
                                      {single.title}
                                    </h3>
                                    <h1
                                      className="animated text-white"
                                      dangerouslySetInnerHTML={{
                                        __html: single.subtitle,
                                      }}
                                    />
                                    <div className="slider-btn-11 btn-hover border-white">
                                      <a className="animated " href={single.url}>
                                        {single.textoBotn}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Section>
                      </div>
                    );
                  })}
              </SectionsContainer>
            </div>
          </Fragment>
        </ShopLayout>
      </MarDeUranoApp>
    </Provider>
  );
};

export const query = graphql`
  query HomeSlider {
    allContentfulHomeSlider(sort: { order: DESC, fields: createdAt }) {
      nodes {
        id
        title
        subtitle
        textoBotn
        slug
        url
        banner {
          fixed(width: 1600, quality: 100) {
            src
          }
        }
        image {
          title
          fixed(width: 500, height: 540, quality: 100) {
            src
          }
        }
      }
    }
    contentfulInformacionDelSitio {
      id
      nombre
      logo {
        fixed(width: 150, height: 30, cropFocus: CENTER) {
          src
        }
      }
    }
  }
`;

export default Home;
