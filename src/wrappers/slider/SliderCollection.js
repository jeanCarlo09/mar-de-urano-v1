import React from "react";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";

import SliderCollectionSingle from "../../components/slider/SliderCollectionSingle";

const SliderCollection = ({ sliderCollection }) => {

    const params = {
        effect: "fade",
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false
        },
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
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
        )
    };
    return (
        <div className="slider-area mt-80">
            <div className="slider-active nav-style-1">
                <Swiper {...params}>
                    {sliderCollection &&
                        sliderCollection.map((single, key) => {
                            return (
                                <SliderCollectionSingle key={key} data={single} sliderClass="swiper-slide" />
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
};


SliderCollection.propTypes = {
    sliderCollection: PropTypes.array
}

export default SliderCollection;
