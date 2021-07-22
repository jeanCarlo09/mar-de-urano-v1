import PropTypes from "prop-types";
import React from "react";

import ProductgridList from "../../components/product/ProductgridList";

const ShopProducts = ({ products, layout }) => (
  <div className="shop-bottom-area mt-35">
    <div className={`row ${layout ? layout : ""}`}>
      {products.length && products.length > 0 ? (
        <ProductgridList products={products} spaceBottomClass="mb-25" />
      ) : (
        <div className={`col-xl-3 col-sm-6`}>
          <div className={`product-wrap`}>
            There are no products to show, try another filter
          </div>
        </div>
      )}
    </div>
  </div>
);

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
