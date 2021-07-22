import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { connect } from "react-redux";

import { getSortedProducts } from "../helpers/product";

import ShopLayout from "./layouts/ShopLayout";
import ShopTopbar from "../wrappers/product/ShopTopbar";
import ShopProducts from "../wrappers/product/ShopProducts";

const ShopApp = (props) => {
  const { products } = props;

  const sortType = "";
  const sortValue = "";

  const [layout, setLayout] = useState("grid four-column");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const pageLimit = 16;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <ShopLayout headerTop="visible">
      <div className="shop-area pt-95 pb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              {/* <ShopTopbar
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                productCount={products.length}
                sortedProductCount={currentData.length}
              /> */}

              <ShopProducts layout={layout} products={currentData} />

              <div className="pro-pagination-style text-center mt-30">
                <Paginator
                  totalRecords={sortedProducts.length}
                  pageLimit={pageLimit}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageContainerClass="mb-0 mt-0"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

ShopApp.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ShopApp);
