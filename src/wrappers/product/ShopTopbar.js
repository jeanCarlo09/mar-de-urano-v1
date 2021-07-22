import PropTypes from "prop-types";
import React from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

const ShopTopbar = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
}) => (
  <ShopTopAction
    getLayout={getLayout}
    getFilterSortParams={getFilterSortParams}
    productCount={productCount}
    sortedProductCount={sortedProductCount}
  />
);

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
};

export default ShopTopbar;
