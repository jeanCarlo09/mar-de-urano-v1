import PropTypes from "prop-types";
import React from "react";
import Sticky from "react-sticky-el";
import { connect } from "react-redux";
import { graphql, useStaticQuery } from "gatsby";
// import Swiper from "react-id-swiper";

import CollectionImageGallerySticky from "../../components/collection/CollectionImageGallerySticky";
import CollectionDescriptionInfo from "../../components/collection/CollectionDescriptionInfo";
// import SliderCollection from "../slider/sliderCollection";
import SliderCollectionSingle from "../../components/slider/SliderCollectionSingle";
import SliderCollection from "../../components/slider/SliderCollection";

const CollectionDescriptionSticky = ({
  collection,
}) => {

  // const params = {
  //   effect: "fade",
  //   loop: true,
  //   speed: 1500,
  //   autoplay: {
  //     delay: 10000,
  //     disableOnInteraction: false
  //   },
  //   watchSlidesVisibility: true,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev"
  //   },
  //   renderPrevButton: () => (
  //     <button className="swiper-button-prev ht-swiper-button-nav">
  //       <i className="pe-7s-angle-left" />
  //     </button>
  //   ),
  //   renderNextButton: () => (
  //     <button className="swiper-button-next ht-swiper-button-nav">
  //       <i className="pe-7s-angle-right" />
  //     </button>
  //   )
  // };


  const { allContentfulSliderCollection } = useStaticQuery(graphql`
    query SliderCollection {
      allContentfulSliderCollection {
          nodes {
              banner {
                  fixed(width: 1920, quality: 100) {
                      src
                  }
              id
          }
          buttonText
          url
          subTitle
          title
        }
      }
    }
  `);

  return (
    <>
      <div className="shop-area pt-95">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <CollectionImageGallerySticky collection={collection} />
            </div>
            <div className="col-lg-6 col-md-6 mt-30">
              <Sticky
                boundaryElement=".container-fluid"
                style={{ position: "relative", marginTop: '10px' }}
              >
                <CollectionDescriptionInfo collection={collection}></CollectionDescriptionInfo>
              </Sticky>
            </div>
          </div>
        </div>

        <SliderCollection sliderCollection={allContentfulSliderCollection.nodes}></SliderCollection>

        {/* <div className="slider-area mt-80">
          <div className="slider-active nav-style-1">
            <Swiper {...params}>
              {allContentfulSliderCollection.nodes &&
                allContentfulSliderCollection.nodes.map((single, key) => {
                  return (
                    <SliderCollectionSingle key={key} data={single} sliderClass="swiper-slide" />
                  );
                })}
            </Swiper>
          </div>
        </div> */}

      </div>

    </>
  );
};

CollectionDescriptionSticky.propTypes = {
  collection: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    collection: state.collectionData.collectionDetail,
  };
};

export default connect(mapStateToProps)(CollectionDescriptionSticky);
