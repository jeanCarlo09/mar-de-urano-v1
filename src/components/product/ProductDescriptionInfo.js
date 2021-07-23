import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import get from "lodash/get";
import truncate from "lodash/truncate";
import uniq from "lodash/uniq";

import { getProductQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import { SocialMedia } from "../social-media/social-media";

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
  print,
  setImageCustomActive
}) => {



  const variants = {
    colors: [],
    sizes: [],
    materials: [],
    prints: []
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

        case 'Print':
          variants.prints.push(option.value);
          product.variants[index].print = option.value;

        default:
          break;
      }
    });
  });

  variants.colors = uniq(variants.colors);
  variants.sizes = uniq(variants.sizes);
  variants.materials = uniq(variants.materials);
  variants.prints = uniq(variants.prints);

  let prints = print.filter((single) => variants.prints.includes(single.printId)).sort((a, b) => (b.printId === 'None' ? 1 : -1));


  const allVariants = { ...variants };

  const [productVariant, setProductVariant] = useState(variants);
  const [productVariants, setProductVariants] = useState(product.variants);

  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [selectedProductMaterial, setSelectedProductMaterial] = useState("");
  const [selectedProductPrint, setSelectedProductPrint] = useState("");

  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );

  const [quantityCount, setQuantityCount] = useState(1);


  const [productCartQty, setProductCartQty] = useState(0);
  const maxQuantity = useRef((product.availableForSale) ? 6 : 0);
  product.maxQuantity = maxQuantity.current;

  const availableForSale = get(product, "availableForSale");
  const shortDescription = get(product, "descriptionHtml")
    ? truncate(get(product, "descriptionHtml"), 100)
    : "";

  const filterByType = (type, value) => {
    // 1 = color
    // 2 = size
    // 3 = material
    // 4 = Print

    const variantsType = {
      colors: type === 1 && allVariants.colors.length > 0 ? allVariants.colors : [],

      sizes: type === 2 && allVariants.sizes.length > 0 ? allVariants.sizes : [],

      materials: type === 3 && allVariants.materials.length > 0 ? allVariants.materials : [],

      prints: type === 4 && allVariants.prints.length > 0 ? allVariants.prints : [],
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

      if (type === 4) {
        return variant.print === value;
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

        if (variant.print !== undefined) {
          variantsType.prints.push(variant.print);
        }

      } else if (type === 2) {
        if (variant.color !== undefined) {
          variantsType.colors.push(variant.color);
        }

        if (variant.material !== undefined) {
          variantsType.materials.push(variant.material);
        }

        if (variant.print !== undefined) {
          variantsType.prints.push(variant.print);
        }

      } else if (type === 3) {
        if (variant.color !== undefined) {
          variantsType.colors.push(variant.color);
        }

        if (variant.size !== undefined) {
          variantsType.sizes.push(variant.size);
        }

        if (variant.print !== undefined) {
          variantsType.prints.push(variant.print);
        }

      } else if (type === 4) {

        if (variant.color !== undefined) {
          variantsType.colors.push(variant.color);
        }

        if (variant.size !== undefined) {
          variantsType.sizes.push(variant.size);
        }

        if (variant.material !== undefined) {
          variantsType.materials.push(variant.material);
        }

      }
    });

    variantsType.colors = uniq(variantsType.colors);
    variantsType.sizes = uniq(variantsType.sizes);
    variantsType.materials = uniq(variantsType.materials);
    variantsType.prints = uniq(variantsType.prints);

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

    setSelectedProductPrint(
      type !== 4
        ? variantsType.prints[0]
          ? variantsType.prints[0]
          : ""
        : selectedProductPrint
    );

    setProductVariant(variantsType);
  };

  const [firstLoad, setFisrtLoad] = useState(true);
  const notInitialRender = useRef(true);

  const updateAddCart = () => {
    setProductCartQty(productCartQty + quantityCount);
    setQuantityCount(1);
  }


  useEffect(() => {
    setProductCartQty(getProductQuantity(cartItems, product, selectedProductColor,
      selectedProductSize, selectedProductMaterial, selectedProductPrint));
    setQuantityCount(1);
  }, [cartItems]);

  useEffect(() => {
    if (firstLoad && productVariant !== null) {
      setSelectedProductColor(
        // productVariant.colors[0] ? productVariant.colors[0] : 
        null
      );
      setSelectedProductSize(
        productVariant.sizes[0] ? productVariant.sizes[0] : null
      );
      setSelectedProductMaterial(
        productVariant.materials[0] ? productVariant.materials[0] : null
      );
      setSelectedProductPrint(
        productVariant.prints[0] ? productVariant.prints[0] : null
      );

    }
  }, [productVariant, firstLoad]);

  useEffect(() => {

    if (product.productType === 'Custom') {
      if (selectedProductPrint && selectedProductColor && selectedProductSize != null) {
        let customProduct = product.variants.filter((item) =>
          (item.print === selectedProductPrint && item.color === selectedProductColor && item.size === selectedProductSize))[0];

        (customProduct) && setImageCustomActive(customProduct.image.localFile.childImageSharp.fixed);

      } else if (selectedProductPrint != null && selectedProductColor === null && !notInitialRender.current) {
        setSelectedProductColor(productVariant.colors[0]);
      }
    }

    setProductCartQty(getProductQuantity(cartItems, product, selectedProductColor,
      selectedProductSize, selectedProductMaterial, selectedProductPrint));

  }, [selectedProductPrint, selectedProductColor, selectedProductSize, selectedProductMaterial]);


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
                        // filterByType(1, single);
                        setQuantityCount(1);
                        notInitialRender.current = false;
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

        {
          prints.length > 0 && (
            <div className="pro-details-color-wrap">
              <span>Print</span>
              <div className="pro-details-color-content">
                {prints.map((single, key) => {
                  let style;

                  style = {
                    backgroundImage: `url(${single.image.fixed.src})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  };


                  return (
                    <label
                      className={`pro-details-color-content--single ${single.printId}`}
                      key={key}
                      style={style}
                    >
                      <input
                        type="radio"
                        value={single.printId}
                        name="product-print"
                        checked={
                          productVariant.prints.length === 1 ||
                            single.printId === selectedProductPrint
                            ? "checked"
                            : ""
                        }
                        onChange={() => {
                          setFisrtLoad(false);
                          // filterByType(4, single.printId);
                          setQuantityCount(1);
                          notInitialRender.current = false;
                          setSelectedProductPrint(single.printId);
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  );
                })}
              </div>
            </div>
          )
        }

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
                        // filterByType(2, single);
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
                        // filterByType(3, single);
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
                (quantityCount + productCartQty) < maxQuantity.current ? quantityCount + 1 : quantityCount
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
                  selectedProductPrint,
                  images,
                );
                updateAddCart();

              }}
              disabled={(!product.availableForSale || productCartQty >= maxQuantity.current
                || product.productType === 'Custom' && (selectedProductColor === null || selectedProductPrint === null)
              )}
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

      <SocialMedia></SocialMedia>

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
      selectedProductPrint,
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
          selectedProductPrint,
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
