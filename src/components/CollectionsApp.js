import React from "react";
import PropTypes from "prop-types";
// import Paginator from "react-hooks-paginator";

import { connect } from "react-redux";

import ShopLayout from "./layouts/ShopLayout";
import CollectionList from "./collection/CollectionList";
import CollectionDescriptionSticky from "../wrappers/collection/CollectionDescriptionSticky";


const CollectionsApp = ({ collectionDetail }) => {
  return (
    <ShopLayout headerTop="visible">
      {(collectionDetail)
        ? <CollectionDescriptionSticky></CollectionDescriptionSticky>
        : <CollectionList></CollectionList>
      }
    </ShopLayout>
  );
};


CollectionsApp.propTypes = {
  collectionDetail: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    collectionDetail: state.collectionData.collectionDetail
  };
}

export default connect(mapStateToProps)(CollectionsApp);
