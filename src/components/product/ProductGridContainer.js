import PropTypes from "prop-types";
import React from "react";
import ProductGrid from "./ProductGrid";

const ProductGridContainer = ({
  spaceTopClass,
  spaceBottomClass,
  category,
}) => {
  return (
    <div
      className={`product-area hm5-section-padding ${
        spaceTopClass ? spaceTopClass : ""
      }  ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <div className="container-fluid">
        <div className="row">
          <ProductGrid
            category={category}
            limit={12}
            spaceBottomClass="mb-20"
          />
        </div>
      </div>
    </div>
  );
};

ProductGridContainer.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductGridContainer;
