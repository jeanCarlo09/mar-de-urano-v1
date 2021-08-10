import PropTypes from "prop-types";
import React from "react";
import Sticky from "react-sticky-el";
import { connect } from "react-redux";
// import { graphql, useStaticQuery } from "gatsby";

// import CollectionImageGallerySticky from "/CollectionImageGallerySticky";
import CollectionDescriptionInfo from "./CollectionDescriptionInfo";
import CollectionImageGallerySticky from "./CollectionImageGallerySticky";
// import SliderCollection from "../slider/SliderCollection";

// import SliderCollection from "../slider/SliderCollection";


const CollectionDescriptionSticky = ({
  collection,
}) => {

  // const { allContentfulSliderCollection } = useStaticQuery(graphql`
  //   query SliderCollections {
  //     allContentfulSliderCollection {
  //         nodes {
  //             banner {
  //                 fixed(width: 1920, quality: 100) {
  //                     src
  //                 }
  //             id
  //         }
  //         buttonText
  //         url
  //         subTitle
  //         title
  //       }
  //     }
  //   }
  // `);

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

        {/* <SliderCollection sliderCollection={allContentfulSliderCollection.nodes}></SliderCollection> */}

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
