import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import get from "lodash/get";

import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  cartItems,
  wishlistItems,
  compareItems,
}) => {
  const wishlistItem = wishlistItems.filter(
    wishlistItem => wishlistItem.id === product.shopifyId
  )[0];

  const compareItem = compareItems.filter(
    compareItem => compareItem.id === product.shopifyId
  )[0];

  const { addToast } = useToasts();

  const price = get(product, "priceRange.maxVariantPrice.amount");
  const currency = get(product, "priceRange.maxVariantPrice.currencyCode");

  const images = get(product, "images");
  const imagesArray = [];

  images.forEach(imgProduct => {
    const imagen = get(imgProduct, "localFile.childImageSharp.fixed");
    if (imagen) {
      imagesArray.push(imagen);
    }
  });

  const finalProductPrice = parseFloat(price);

  const discountedPrice = null;

  const finalDiscountedPrice = 0;

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <ProductImageGallerySideThumb
              product={product}
              thumbPosition="left"
              images={imagesArray}
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              addToast={addToast}
              images={imagesArray}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
