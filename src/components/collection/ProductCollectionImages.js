import React from 'react';

export const ProductCollectionImages = ({ product }) => {

    return (
        product.images.slice(0, 2).map((img, index) => (

            <div className="product-sticky-image__single mb-10" key={index}>
                <img
                    style={{ width: "100%" }}
                    src={img.localFile.childImageSharp.fixed.src}
                    alt={product.title}
                    className="img-fluid"
                />
            </div>
        ))
    )

}