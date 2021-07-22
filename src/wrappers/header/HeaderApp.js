import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";

import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";

const HeaderApp = ({
  logo,
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerBgClass,
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    if (typeof window !== `undefined`) {
      window && window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== `undefined`) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    if (typeof window !== `undefined`) {
      setScroll(window.scrollY);
    }
  };

  const menuQuery = useStaticQuery(graphql`
    query Menu {
      allContentfulMenu(
        filter: { visible: { eq: true }, isTop: { eq: true } }
        sort: { fields: order, order: ASC }
      ) {
        nodes {
          id
          title
          menuLink
          menuChild {
            id
            title
            menuLink
            order
            subMenu {
              id
              title
              url
            }
          }
          subMenu {
            id
            title
            url
          }
        }
      }
    }
  `);

  return (
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ""}`}
    >
      <div
        className={` ${headerPaddingClass ? headerPaddingClass : ""
          } sticky-bar header-res-padding clearfix ${scroll > headerTop ? "stick" : ""
          }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              <Logo imageUrl={logo} logoClass="logo" />
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              <NavMenu menuOptions={menuQuery.allContentfulMenu.nodes} />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              <IconGroup />
            </div>
          </div>
        </div>
        <MobileMenu menuOptions={menuQuery.allContentfulMenu.nodes} />
      </div>
    </header>
  );
};

HeaderApp.propTypes = {
  logo: PropTypes.string,
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
};

export default HeaderApp;
