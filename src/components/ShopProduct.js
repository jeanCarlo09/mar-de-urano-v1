import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import ShopLayout from "../components/layouts/ShopLayout";

// import RelatedProductSlider from "../wrappers/product/RelatedProductSlider";
// import ProductDescriptionTab from "../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../wrappers/product/ProductImageDescription";

const ProductTabLeft = ({ product }) => {
  return (
    <ShopLayout headerTop="visible">
      <ProductImageDescription
        spaceTopClass="pt-100"
        spaceBottomClass="pb-100"
        product={product}
        galleryType="leftThumb"
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
    product: state.productData.products[0],
  };
};

export default connect(mapStateToProps)(ProductTabLeft);
