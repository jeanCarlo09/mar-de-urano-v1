import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Swiper from "react-id-swiper";
import { getProductCartQuantity, getProductQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import truncate from "lodash/truncate";
import get from "lodash/get";
import uniq from "lodash/uniq";

// import Variant from "../Variant";

function ProductModal(props) {
  const {
    product,
    currency,
    discountedprice,
    finalproductprice,
    finaldiscountedprice,
    images,
  } = props;

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [selectedProductMaterial, setSelectedProductMaterial] = useState("");

  const [productStock, setProductStock] = useState(
    product.availableForSale ? 10 : 0
  );

  const [quantityCount, setQuantityCount] = useState(1);

  const [productCartQty, setProductCartQty] = useState(0);
  const maxQuantity = useRef((product.availableForSale) ? process.env.GATSBY_MAX_QUANTITY_PRODUCTS : 0);
  product.maxQuantity = maxQuantity.current;

  const wishlistItem = props.wishlistitem;

  const addToCart = props.addtocart;
  const addToWishlist = props.addtowishlist;

  const addToast = props.addtoast;
  const cartItems = props.cartitems;

  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize,
  //   selectedProductMaterial
  // );

  const shortDescription = get(product, "description");

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

  const [firstLoad, setFisrtLoad] = useState(true);


  useEffect(() => {
    setProductCartQty(getProductQuantity(cartItems, product, selectedProductColor,
      selectedProductSize, selectedProductMaterial, null));
    setQuantityCount(1);
  }, [cartItems]);


  useEffect(() => {
    setProductCartQty(getProductQuantity(cartItems, product, selectedProductColor,
      selectedProductSize, selectedProductMaterial, null));
  }, [selectedProductColor, selectedProductSize, selectedProductMaterial]);


  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }

    if (firstLoad && productVariant !== null) {
      setSelectedProductColor(
        productVariant.colors[0] ? productVariant.colors[0] : ""
      );
      setSelectedProductSize(
        productVariant.sizes[0] ? productVariant.sizes[0] : ""
      );
      setSelectedProductMaterial(
        productVariant.materials[0] ? productVariant.materials[0] : ""
      );
    }
  }, [gallerySwiper, thumbnailSwiper, productVariant, firstLoad]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

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

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {images &&
                    images.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={single.src}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {images &&
                    images.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={single.src}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.title}</h2>
                <div className="product-details-price">
                  {discountedprice !== null && discountedprice > 0 ? (
                    <Fragment>
                      <span>{currency + finaldiscountedprice}</span>{" "}
                      <span className="old">
                        {currency + finalproductprice}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{currency + finalproductprice} </span>
                  )}
                </div>
                <div className="pro-details-list">
                  <p>{shortDescription}</p>
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
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
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
                            null,
                            images
                          );
                        }}
                        disabled={!product.availableForSale || productCartQty >= maxQuantity.current}
                      >
                        {" "}
                        Add To Cart{" "}
                      </button>
                    ) : (
                      <button disabled>Out of stock </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.string,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  images: PropTypes.array,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartitems: state.cartData,
  };
};

export default connect(mapStateToProps)(ProductModal);
