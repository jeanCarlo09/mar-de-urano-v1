import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import get from "lodash/get";
import truncate from "lodash/truncate";
import uniq from "lodash/uniq";

import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare,
  images,
}) => {
  const variants = {
    colors: [],
    sizes: [],
    materials: [],
  };

  product.variants.forEach((variant, index) => {
    variant.selectedOptions.forEach((option) => {
      switch (option.name) {
        case "Size":
          variants.sizes.push(option.value);
          product.variants[index].size = option.value;
          break;
        case "Color":
          variants.colors.push(option.value);
          product.variants[index].color = option.value;
          break;
        case "Material":
          variants.materials.push(option.value);
          product.variants[index].material = option.value;
          break;
        default:
          break;
      }
    });
  });

  variants.colors = uniq(variants.colors);
  variants.sizes = uniq(variants.sizes);
  variants.materials = uniq(variants.materials);

  const allVariants = { ...variants };

  const [productVariant, setProductVariant] = useState(variants);
  const [productVariants, setProductVariants] = useState(product.variants);

  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [selectedProductMaterial, setSelectedProductMaterial] = useState("");

  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const availableForSale = get(product, "availableForSale");
  const shortDescription = get(product, "descriptionHtml")
    ? truncate(get(product, "descriptionHtml"), 100)
    : "";

  const filterByType = (type, value) => {
    // 1 = color
    // 2 = size
    // 3 = material

    const variantsType = {
      colors:
        type === 1 && allVariants.colors.length > 0 ? allVariants.colors : [],
      sizes:
        type === 2 && allVariants.sizes.length > 0 ? allVariants.sizes : [],
      materials:
        type === 3 && allVariants.materials.length > 0
          ? allVariants.materials
          : [],
    };

    const variantes = productVariants.filter((variant) => {
      if (type === 1) {
        return variant.color === value;
      }

      if (type === 2) {
        return variant.size === value;
      }

      if (type === 3) {
        return variant.material === value;
      }

      return false;
    });

    variantes.forEach((variant) => {
      if (type === 1) {
        if (variant.size !== undefined) {
          variantsType.sizes.push(variant.size);
        }

        if (variant.material !== undefined) {
          variantsType.materials.push(variant.material);
        }
      } else if (type === 2) {
        if (variant.color !== undefined) {
          variantsType.colors.push(variant.color);
        }

        if (variant.material !== undefined) {
          variantsType.materials.push(variant.material);
        }
      } else if (type === 3) {
        if (variant.color !== undefined) {
          variantsType.colors.push(variant.color);
        }

        if (variant.size !== undefined) {
          variantsType.sizes.push(variant.size);
        }
      }
    });

    variantsType.colors = uniq(variantsType.colors);
    variantsType.sizes = uniq(variantsType.sizes);
    variantsType.materials = uniq(variantsType.materials);

    setSelectedProductColor(
      type !== 1
        ? variantsType.colors[0]
          ? variantsType.colors[0]
          : ""
        : selectedProductColor
    );
    setSelectedProductSize(
      type !== 2
        ? variantsType.sizes[0]
          ? variantsType.sizes[0]
          : ""
        : selectedProductSize
    );
    setSelectedProductMaterial(
      type !== 3
        ? variantsType.materials[0]
          ? variantsType.materials[0]
          : ""
        : selectedProductMaterial
    );

    setProductVariant(variantsType);
  };

  const [firstLoad, setFisrtLoad] = useState(true);

  useEffect(() => {
    if (firstLoad && productVariant !== null) {
      setSelectedProductColor(
        productVariant.colors[0] ? productVariant.colors[0] : null
      );
      setSelectedProductSize(
        productVariant.sizes[0] ? productVariant.sizes[0] : null
      );
      setSelectedProductMaterial(
        productVariant.materials[0] ? productVariant.materials[0] : null
      );
    }
  }, [productVariant, firstLoad]);

  return (
    <div className="product-details-content ml-70">
      <h2>{product.title}</h2>
      <div className="product-details-price">
        {discountedPrice !== null && discountedPrice > 0 ? (
          <Fragment>
            <span>{currency + " " + finalDiscountedPrice}</span>{" "}
            <span className="old">{currency + finalProductPrice}</span>
          </Fragment>
        ) : (
          <span>{currency + " " + finalProductPrice} </span>
        )}
      </div>
      <div className="pro-details-list">
        <p dangerouslySetInnerHTML={{ __html: shortDescription }}></p>
      </div>

      <div className="pro-details-size-color">
        {productVariant.colors.length > 0 && (
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {productVariant.colors.map((single, key) => {
                let style;

                if (single.indexOf("#") >= 0) {
                  style = { background: single };
                } else if (single.indexOf("http") >= 0) {
                  style = {
                    backgroundImage: `url(${single})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  };
                }

                return (
                  <label
                    className={`pro-details-color-content--single ${single}`}
                    key={key}
                    style={style}
                  >
                    <input
                      type="radio"
                      value={single}
                      name="product-color"
                      checked={
                        productVariant.colors.length === 1 ||
                        single === selectedProductColor
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        setFisrtLoad(false);
                        filterByType(1, single);
                        setQuantityCount(1);

                        setSelectedProductColor(single);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {productVariant.sizes.length > 0 && (
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {productVariant.sizes.map((single, key) => {
                return (
                  <label
                    className={`pro-details-size-content--single`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single}
                      checked={
                        productVariant.sizes.length === 1 ||
                        single === selectedProductSize
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        setFisrtLoad(false);
                        filterByType(2, single);
                        setQuantityCount(1);

                        setSelectedProductSize(single);
                      }}
                    />
                    <span className="size-name">{single}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {productVariant.materials.length > 0 && (
          <div className="pro-details-size">
            <span>Material</span>
            <div className="pro-details-size-content">
              {productVariant.materials.map((single, key) => {
                return (
                  <label
                    className={`pro-details-size-content--single`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single}
                      checked={
                        productVariant.materials.length === 1 ||
                        single === selectedProductMaterial
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        setFisrtLoad(false);
                        filterByType(3, single);
                        setQuantityCount(1);

                        setSelectedProductMaterial(single);
                      }}
                    />
                    <span className="size-name">{single}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() =>
              setQuantityCount(
                quantityCount < 5 ? quantityCount + 1 : quantityCount
              )
            }
            className="inc qtybutton"
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          {product.availableForSale ? (
            <button
              onClick={() => {
                addToCart(
                  product,
                  addToast,
                  quantityCount,
                  selectedProductColor,
                  selectedProductSize,
                  selectedProductMaterial,
                  images
                );
              }}
              disabled={!product.availableForSale}
            >
              {" "}
              Add To Cart{" "}
            </button>
          ) : (
            <button disabled>Out of stock </button>
          )}
        </div>
      </div>

      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.string,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize,
      selectedProductMaterial,
      images
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize,
          selectedProductMaterial,
          images
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
