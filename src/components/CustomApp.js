import React, { useState } from 'react';
import ShopLayout from '../components/layouts/ShopLayout';

import RelatedProducts from '../wrappers/product/RelatedProducts';
import ShopProducts from '../wrappers/product/ShopProducts';
import { connect } from 'react-redux';
import SliderSingleCustom from './slider/SliderSingleCustom';

const CustomApp = ({ relatedProducts, sliderData, products }) => {

    const [layout, setLayout] = useState("grid four-column");

    return (
        <ShopLayout headerTop="visible">

            <SliderSingleCustom sliderData={sliderData}></SliderSingleCustom>

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