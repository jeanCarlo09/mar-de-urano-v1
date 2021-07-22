import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import moment from "moment";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition, images }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

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
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      1200: {
        slidesPerView: 4,
        direction: "vertical",
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      320: {
        slidesPerView: 4,
        direction: "horizontal",
      },
    },
  };

  const discount = false;

  const newProduct = moment(product.publishedAt).isAfter(
    moment().subtract("7", "days")
  );

  return (
    <Fragment>
      <div className="row row-5">
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10"
          }`}
        >
          <div className="product-large-image-wrapper">
            {discount || newProduct ? (
              <div className="product-img-badges">
                {discount ? <span className="gold">0%</span> : ""}
                {newProduct ? <span className="gold">New</span> : ""}
              </div>
            ) : (
              ""
            )}
            <LightgalleryProvider>
              <Swiper {...gallerySwiperParams}>
                {images &&
                  images.map((single, key) => {
                    return (
                      <div key={key}>
                        <LightgalleryItem group="any" src={single.src}>
                          <button>
                            <i className="pe-7s-expand1"></i>
                          </button>
                        </LightgalleryItem>
                        <div className="single-image">
                          <img src={single.src} className="img-fluid" alt="" />
                        </div>
                      </div>
                    );
                  })}
              </Swiper>
            </LightgalleryProvider>
          </div>
        </div>
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2"
          }`}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            <Swiper {...thumbnailSwiperParams}>
              {images &&
                images.map((single, key) => {
                  return (
                    <div key={key}>
                      <div className="single-image">
                        <img src={single.src} className="img-fluid" alt="" />
                      </div>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.object,
  thumbPosition: PropTypes.string,
  images: PropTypes.array,
};

export default ProductImageGalleryLeftThumb;
