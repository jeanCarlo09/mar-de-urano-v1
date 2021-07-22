import React from "react";
import { Link } from "gatsby";
import { multilanguage } from "redux-multilanguage";

const MobileMenuItem = ({ item }) => {

  return (item.menuChild === null && item.subMenu === null) ? (
    <li>
      <Link to={`/${item.menuLink}`}>{item.title}</Link>
    </li>
  ) : (
    <li className="menu-item-has-children">
      <Link to={`/${item.menuLink}`}>{item.title}</Link>
      <ul className="sub-menu">

        {(item.menuChild) ?
          item.menuChild
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((itemSubmenu) => (
              <li key={itemSubmenu.id} className="menu-item-has-children">
                <Link to={`/shop?${itemSubmenu.menuLink}`}>
                  {itemSubmenu.title}
                </Link>
                <ul className="sub-menu">
                  {itemSubmenu.subMenu &&
                    itemSubmenu.subMenu.map((itemSubmenuItem) => (
                      <li key={itemSubmenuItem.id}>
                        <Link to={`/shop?${itemSubmenuItem.url}`}>
                          {itemSubmenuItem.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))
          :
          (item.subMenu) &&
          <>

            {
              item.subMenu.map((itemSubmenuItem) => (
                <li key={itemSubmenuItem.id}>
                  <Link to={`/${item.menuLink}?${itemSubmenuItem.url}`}>
                    {itemSubmenuItem.title}
                  </Link>
                </li>
              ))
            }

          </>
        }
      </ul>
    </li>
  );
};

export default multilanguage(MobileMenuItem);

{
  /* <ul className="sub-menu">
  {item.menuChild &&
    item.menuChild
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((itemSubmenu) => (
        <li className="menu-item-has-children" key={itemSubmenu.id}>
          <ul className="sub-menu">
            <li className="menu-item-has-children">
              <Link to={`/shop?${itemSubmenu.menuLink}`}>
                {itemSubmenu.title}
              </Link>
              <ul className="sub-menu">
                {itemSubmenu.subMenu &&
                  itemSubmenu.subMenu.map((itemSubmenuItem) => (
                    <li key={itemSubmenuItem.id}>
                      <Link to={`/shop?${itemSubmenuItem.url}`}>
                        {itemSubmenuItem.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        </li>
      ))}
</ul>; */
}
