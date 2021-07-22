import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import { multilanguage } from "redux-multilanguage";

import NavMenuItem from "./sub-components/NavMenuItem";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu, menuOptions }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          {menuOptions &&
            menuOptions.map((item) => (
              <NavMenuItem
                key={item.id}
                item={item}
                sidebarMenu={sidebarMenu}
              ></NavMenuItem>
            ))}
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenu);
