
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const SliderCollectionSingle = ({ data, sliderClass }) => {
    return (
        <div
            className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${sliderClass ? sliderClass : ""
                }`}
            style={{ backgroundImage: `url(${data.banner.fixed.src})` }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-8 col-12 content-slider-collections">
                        <div className="slider-content-3 slider-animated-1 text-center">
                            <h3 className="animated">{data.subTitle}</h3>
                            <h1 className="animated">{data.title}</h1>
                            {/* <p className="animated">{data.text}</p> */}
                            <div className="slider-btn btn-hover">
                                <Link
                                    className="animated"
                                    to={`/${data.url}`}
                                >
                                    {data.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SliderCollectionSingle.propTypes = {
    data: PropTypes.object.isRequired,
    sliderClass: PropTypes.string
};

export default SliderCollectionSingle;
