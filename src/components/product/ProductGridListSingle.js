import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "gatsby";
import { useToasts } from "react-toast-notifications";
import get from "lodash/get";
import moment from "moment";

import ProductModal from "./ProductModal";

const ProductGridListSingle = ({
  product,
  addToCart,
  addToWishlist,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const price = get(product, "priceRange.maxVariantPrice.amount");
  const currency = get(product, "priceRange.maxVariantPrice.currencyCode");

  const url = `/${product.handle}`;

  const images = get(product, "images");
  const imagesArray = [];

  images.forEach((imgProduct) => {
    const imagen = get(imgProduct, "localFile.childImageSharp.fixed");
    if (imagen) {
      imagesArray.push(imagen);
    }
  });


  const finalProductPrice = parseFloat(price);

  const availableForSale = get(product, "availableForSale");

  // const shortDescription = get(product, "description");

  const discount = false;
  const newProduct = moment(product.publishedAt).isAfter(
    moment().subtract("7", "days")
  );

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-sm-6 ${sliderClassName ? sliderClassName : ""
          }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={url}>
              <img className="default-img" src={imagesArray[0].src} alt="" />
              {imagesArray.length > 1 ? (
                <img className="hover-img" src={imagesArray[1].src} alt="" />
              ) : (
                ""
              )}
            </Link>
            {discount || newProduct ? (
              <div className="product-img-badges">
                {discount ? <span className="pink">10%</span> : ""}
                {newProduct ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action">
              <div className={`pro-same-action ${(product.productType != 'Custom') ? 'pro-cart' : 'pro-cart-custom'}`}>
                {availableForSale ? (
                  <Link to={url}>Select Option</Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined ? "Added to cart" : "Add to cart"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? "Added"
                      : "Add to cart"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>

              {
                (product.productType != 'Custom') &&
                <div className="pro-same-action pro-quickview">
                  <button onClick={() => setModalShow(true)} title="Quick View">
                    <i className="pe-7s-look" />
                  </button>
                </div>
              }

            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={url}>{product.title}</Link>
            </h3>
            {/* <pre>{JSON.stringify(product.tags, null, 2)}</pre> */}

            <div className="product-price">
              <span>{currency + " " + finalProductPrice.toFixed(2)} </span>
            </div>
          </div>
        </div>
        {/* <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={"/product/" + product.shopifyId}>
                    <img
                      className="default-img"
                      src={imagesArray[0].src}
                      alt=""
                    />
                    {imagesArray.length > 1 ? (
                      <img
                        className="hover-img"
                        src={imagesArray[1].src}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={url}>{product.name}</Link>
                </h3>
                {shortDescription !== "" ? <p>{shortDescription}</p> : ""}

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {availableForSale ? (
                      <Link to={url}>Select Option</Link>
                    ) : product.stock && product.stock > 0 ? (
                      <button
                        onClick={() => addToCart(product, addToast)}
                        className={
                          cartItem !== undefined && cartItem.quantity > 0
                            ? "active"
                            : ""
                        }
                        disabled={
                          cartItem !== undefined && cartItem.quantity > 0
                        }
                        title={
                          cartItem !== undefined
                            ? "Added to cart"
                            : "Add to cart"
                        }
                      >
                        {" "}
                        <i className="pe-7s-cart"></i>{" "}
                        {cartItem !== undefined && cartItem.quantity > 0
                          ? "Added"
                          : "Add to cart"}
                      </button>
                    ) : (
                      <button disabled className="active">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        images={imagesArray}
        currency={currency}
        discountedprice={0}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={0}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridListSingle;
