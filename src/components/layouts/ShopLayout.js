import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { StaticQuery, graphql } from "gatsby";
import get from "lodash/get";

import HeaderApp from "../../wrappers/header/HeaderApp";
import FooterAppOne from "../../wrappers/footer/FooterAppOne";

// import "../assets/scss/style.scss";
import "../../assets/scss/style.scss";

const ShopLayout = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
}) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteInfo {
          contentfulInformacionDelSitio {
            id
            nombre
            logo {
              fixed(width: 150, height: 30, cropFocus: CENTER) {
                src
              }
            }
            logoFooter {
              fixed(width: 150, height: 100, cropFocus: CENTER) {
                src
              }
            }
          }
        }
      `}
      render={(data) => {
        const logoHeader = get(
          data,
          "contentfulInformacionDelSitio.logo.fixed.src"
        );
        const logoFooter = get(
          data,
          "contentfulInformacionDelSitio.logoFooter.fixed.src"
        );

        return (
          <Fragment>
            <HeaderApp
              logo={logoHeader}
              layout={headerContainerClass}
              top={headerTop}
              headerPaddingClass={headerPaddingClass}
            />
            {children}
            <FooterAppOne
              logoFooter={logoFooter}
              backgroundColorClass="bg-gray"
              spaceTopClass="pt-100"
              spaceBottomClass="pb-70"
            />
          </Fragment>
        );
      }}
    />
  );
};

ShopLayout.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerTop: PropTypes.string,
};

export default ShopLayout;
