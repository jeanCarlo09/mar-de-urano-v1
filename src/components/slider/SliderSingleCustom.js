import React from 'react';
import { Link } from 'gatsby';

const SliderSingleCustom = ({ sliderData }) => {
    console.log(sliderData);
    return (
        <div className="owl-stage-outer pt-95">
            <div className="owl-stage" >
                <div className="owl-item cloned">
                    <div className="custom-img single-slider-2 d-flex align-items-center bg-img flone_slider_3" style={{ backgroundImage: `url(${sliderData.imageSlider.fluid.src})` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-7 col-md-8 col-12 ml-auto">
                                    <div className="slider-content-3 slider-animated-1 text-center">
                                        <h3 className="animated">{sliderData.subTitle}</h3>

                                        <h1 className="animated">{sliderData.title}</h1>
                                        <p className="animated">{sliderData.description}</p>

                                        <div className="slider-btn btn-hover">
                                            <Link to={`/${sliderData.url}`} className="animated">{sliderData.textButton}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SliderSingleCustom;
