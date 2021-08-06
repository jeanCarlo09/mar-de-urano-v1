

export const types = {
    //Blog
    fetchBlogSuccess: '[blog] Fetch Blog Success',
    postSingleInfo: '[blog] Post Single Info',
    addActiveCategory: '[blog] Blog New Active Category ',
    removeActiveCategory: '[blog] Blog Remove Active Category ',

    //Product
    fetchProductsSuccess: '[product] Fetch Products Success',
    fetchProductSingle: '[product] Fetch Products Single',

    //Collection
    fetchCollectionsSuccess: '[collection] FETCH COLLECTIONS SUCCESS',
    fetchCollectionDetails: '[collection] Fetch Collection Details',

    //Cart
    deleteAllFromCart: '[cart] DELETE_ALL_FROM_CART',
    deleteFromCart: '[cart] DELETE_FROM_CART',
    increaseQuantity: '[cart] INCREASE_QUANTITY',
    decreaseQuantity: '[cart] DECREASE_QUANTITY',
    addToCart: '[cart] ADD_TO_CART',

    //Compare
    addToCompare: '[compare] ADD_TO_COMPARE',
    deleteFromCompare: '[compare] DELETE_FROM_COMPARE',

    //Currency
    setCurrency: '[currency] SET_CURRENCY',

    //Checkout
    initialClient: '[checkout] INITIAL_CLIENT',
    createCheckout: '[checkout] CREATE_CHECKOUT',
    updateCheckout: '[checkout] UPDATE_CHECKOUT',
    addToCheckout: '[checkout] ADD_TO_CHECKOUT',

    //WishList
    addToWishList: '[wishList] ADD_TO_WISHLIST',
    deleteFromWishList: '[wishList] DELETE_FROM_WISHLIST',
    deleteAllFromWishList: '[wishList] DELETE_ALL_FROM_WISHLIST',
}