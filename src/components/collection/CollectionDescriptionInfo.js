import PropTypes from "prop-types";
import React from "react";
import parse from "html-react-parser";
// import { SocialMedia } from "../social-media/social-media";

const CollectionDescriptionInfo = ({
  collection
}) => {

  return (
    <div className="product-details-content ml-70">
      <h2>{collection.title}</h2>

      <div className="pro-details-list mb-4">
        {parse(collection.descriptionHtml)}
      </div>

      {/* <SocialMedia></SocialMedia> */}

    </div>
  );
};

CollectionDescriptionInfo.propTypes = {
  collection: PropTypes.object.isRequired
};


export default CollectionDescriptionInfo;
