import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import get from "lodash/get";
import parse from 'html-react-parser';

import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import RelatedProducts from "./RelatedProducts";
import { relatedProductsShop } from "../../helpers/relatedProducts";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  productActive,
  cartItems,
  wishlistItems,
  compareItems,
  print,
}) => {

  const product = productActive.product[0];
  let relatedProducts = productActive.relatedProducts;

  relatedProducts = relatedProductsShop(relatedProducts, product);

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

  const [description, setDescription] = useState(true);

  const [imageCustomActive, setImageCustomActive] = useState((product.productType === 'Custom' ? imagesArray[0] : null));

  const checkDescription = () => {
    if (!description) {
      setDescription(true);
    }
  }

  const uncheckDescription = () => {
    if (description) {
      setDescription(false);
    }

  }

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <ProductImageGallerySideThumb
              product={product}
              thumbPosition="left"
              images={imagesArray}
              imageCustomActive={imageCustomActive}
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
              print={print}
              setImageCustomActive={setImageCustomActive}
            />
          </div>

          <div className="col-12">
            <ul className="product-info" role="tablist">
              <li className={`product-info-description ${description && 'active'}`} onClick={checkDescription}>
                <span>Description</span>
              </li>
              <li className={`product-info-additional-information ${!description && 'active'}`} onClick={uncheckDescription}>
                <span>Additional information</span>
              </li>
            </ul>

            <div className="product-info-text mt-20">
              {
                description
                  ?
                  parse(product.descriptionHtml)
                  :
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book
                  </p>
              }
            </div>

            <RelatedProducts relatedProducts={relatedProducts}></RelatedProducts>

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
