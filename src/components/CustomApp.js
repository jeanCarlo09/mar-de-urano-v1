import React, { useState } from 'react';
import ShopLayout from '../components/layouts/ShopLayout';
import { Link } from 'gatsby';
import RelatedProducts from '../wrappers/product/RelatedProducts';
import ShopProducts from '../wrappers/product/ShopProducts';
import { connect } from 'react-redux';

const CustomApp = ({ relatedProducts, products }) => {

    const [layout, setLayout] = useState("grid four-column");

    return (
        <ShopLayout headerTop="visible">
            <div className="owl-stage-outer pt-125">
                <div className="owl-stage" >
                    <div className="owl-item cloned">
                        <div className="custom-img single-slider-2 d-flex align-items-center bg-img flone_slider_3" style={{ backgroundImage: 'url(https://flone.hasthemes.com/wp-content/uploads/2020/04/slider-2.jpg)' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-7 col-md-8 col-12 ml-auto">
                                        <div className="slider-content-3 slider-animated-1 text-center">
                                            <h3 className="animated">Stylish</h3>

                                            <h1 className="animated">Male Clothes</h1>
                                            <p className="animated">30% off Summer Vacation</p>

                                            <div className="slider-btn btn-hover">
                                                <Link to="/shop" className="animated">SHOP NOW</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop-area pt-20 pb-100">
                <div className="container-fluid">

                    <ShopProducts layout={layout} products={products} />

                    <RelatedProducts relatedProducts={relatedProducts}></RelatedProducts>

                </div>
            </div>
        </ShopLayout>
    );

}

const mapStateToProps = (state) => {
    return {
        products: state.productData.products,
    };
};

export default connect(mapStateToProps)(CustomApp)