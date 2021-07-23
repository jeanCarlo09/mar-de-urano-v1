import PropTypes from "prop-types";
import React from "react";
import { ProductCollectionImages } from "./ProductCollectionImages";

const CollectionImageGallerySticky = ({ collection }) => {
  return (
    <div className="product-large-image-wrapper product-large-image-wrapper--sticky">
      <div className="product-sticky-image mb--10">
        {
          collection.products.map((product) => (
            <ProductCollectionImages key={product.shopifyId} product={product}></ProductCollectionImages>
          ))
        }
      </div>
    </div>
  );
};

CollectionImageGallerySticky.propTypes = {
  product: PropTypes.object
};

export default CollectionImageGallerySticky;
