import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "gatsby";
import { useToasts } from "react-toast-notifications";
import get from "lodash/get";

import { handleCheckout } from "../../../helpers/checkout";

const MenuCart = ({ cartData, deleteFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();

  let currency = "USD";

  const onHandleCheckout = (e) => {
    e.preventDefault();
    handleCheckout(cartData);
  };

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const imagesProduct = get(single, "images");

              currency = get(single, "priceRange.maxVariantPrice.currencyCode");

              const discountedPrice = null;
              const price = get(single, "priceRange.maxVariantPrice.amount");
              const finalProductPrice = parseFloat(price).toFixed(2);
              const finalDiscountedPrice = 0;

              discountedPrice !== null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);


              let imageCustomProduct = null;

              if (single.productType === 'Custom') {
                let customProduct = single.variants.filter((item) =>
                (item.print === single.selectedProductPrint &&
                  item.color === single.selectedProductColor &&
                  item.size === single.selectedProductSize))[0];
                imageCustomProduct = customProduct.image.localFile.childImageSharp.fixed;
              }

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={`/${single.handle}`}>
                      <img
                        alt=""
                        src={single.productType === 'Custom' ? imageCustomProduct.src : imagesProduct[0].src}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={`/${single.handle}`}> {single.title} </Link>
                    </h4>
                    <h6>Qty: {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? currency + finalDiscountedPrice
                        : currency + finalProductPrice}
                    </span>

                    <div className="cart-item-variation">
                      {single.selectedProductColor && (
                        <span>Color: {single.selectedProductColor}</span>
                      )}
                      {single.selectedProductSize && (
                        <span>Size: {single.selectedProductSize}</span>
                      )}
                      {single.selectedProductMaterial && (
                        <span>Material: {single.selectedProductMaterial}</span>
                      )}

                      {single.selectedProductPrint && (
                        <span>Print: {single.selectedProductPrint}</span>
                      )}

                    </div>
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={"/cart"}>
              view cart
            </Link>
            <a
              href="#checkout"
              onClick={onHandleCheckout}
              className="default-btn"
            >
              checkout
            </a>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
};

export default MenuCart;
