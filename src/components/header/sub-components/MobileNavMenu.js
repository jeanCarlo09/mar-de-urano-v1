import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import { multilanguage } from "redux-multilanguage";
import MobileMenuItem from "./MobileMenuItem";

const MobileNavMenu = ({ strings, menuOptions }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        {menuOptions &&
          menuOptions.map((item) => (
            <MobileMenuItem key={item.id} item={item}></MobileMenuItem>
          ))}
      </ul>
      {/* <ul>
        <li className="menu-item">
          <Link to={"/shop"}>{strings["shop"]}</Link>
        </li>
        <li className="menu-item">
          <Link to={"/collections"}>{strings["collections"]}</Link>
        </li>
        <li className="menu-item">
          <Link to={"/our-world"}>{strings["our-world"]}</Link>
        </li>
        <li className="menu-item">
          <Link to={"/sale"}>{strings["sale"]}</Link>
        </li>
      </ul> */}
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
