import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Paginator from "react-hooks-paginator";
import { connect } from "react-redux";

import ShopLayout from "./layouts/ShopLayout";
import ProductGridContainer from "../components/product/ProductGridContainer";

const CollectionsApp = () => {
  return (
    <ShopLayout headerTop="visible">
      <ProductGridContainer
        spaceTopClass="pt-100"
        spaceBottomClass="pb-100"
        category="accessories"
      />
    </ShopLayout>
  );
};

export default CollectionsApp;
