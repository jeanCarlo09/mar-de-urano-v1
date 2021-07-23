

export const relatedProductsShop = (relatedProducts, product) => {

    let products = relatedProducts.filter((item) => (item.shopifyId != product.shopifyId) ? item.productType === product.productType : false)
        .slice(0, 4);

    if (products.length < 4) {

        let productsByTags;

        if (products.length > 0) {
            productsByTags = relatedProducts.filter((item) => products.some(element => element.shopifyId != item.shopifyId) ? item.tags.some((tag) => product.tags.includes(tag)) : false);
        } else {
            productsByTags = relatedProducts.filter((item) => item.shopifyId != product.shopifyId ? item.tags.some((tag) => product.tags.includes(tag)) : false);
        }

        products = products.concat(productsByTags.slice(products.length, 4));

        if (products.length < 4) {

            if (products.length > 0) {
                return products.concat(relatedProducts.filter((item) => products.some(element => element.shopifyId != item.shopifyId)).slice(products.length, 4));
            } else {
                return relatedProducts.slice(0, 4);
            }
        } else {
            return products;
        }

    } else {
        return products
    }
}