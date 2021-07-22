import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";

const FooterCopyright = ({ footerLogo, spaceBottomClass }) => {
  return (
    <div>
      <div className="footer-logo">
        <Link to={"/home"}>
          <img alt="" src={footerLogo} />
        </Link>
      </div>
      <p>
        © 2020 <Link to={"/home"}>Mar de Urano</Link> All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default FooterCopyright;
