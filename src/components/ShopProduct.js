import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import ShopLayout from "../components/layouts/ShopLayout";

// import RelatedProductSlider from "../wrappers/product/RelatedProductSlider";
// import ProductDescriptionTab from "../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../wrappers/product/ProductImageDescription";

const ProductTabLeft = ({ productActive, print, colorsCustom }) => {

  return (
    <ShopLayout headerTop="visible">
      <ProductImageDescription
        spaceTopClass="pt-95"
        spaceBottomClass="pb-100"
        productActive={productActive}
        galleryType="leftThumb"
        print={print}
        colorsCustom={colorsCustom}
      />
      {/* <ProductDescriptionTab
        spaceBottomClass="pb-90"
        productFullDesc={product.descriptionHtml}
      /> */}
    </ShopLayout>
  );
};

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    productActive: state.productData.productActive,
  };
};

export default connect(mapStateToProps)(ProductTabLeft);
