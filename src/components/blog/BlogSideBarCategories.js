import React from 'react';
import { CheckCategorie } from './CheckCategorie';
import PropTypes from "prop-types";

export const BlogSideBarCategories = ({ categories, categoriesActives }) => {

    return (
        <section className="sidebar-widget mt-35 mb-30">
            <h3 className="widget-title blog-sidebar-title">Categories</h3>
            <div className="sidebar-widget-list sidebar-widget-list--blog mt-20">
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <div className="sidebar-widget-list-left blog-categories-item">
                                <CheckCategorie category={category}
                                    isChecked={(categoriesActives) ? categoriesActives.includes(category.handle) : false}>

                                </CheckCategorie>
                                <span className="checkmark" />
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

        </section>
    );

}

BlogSideBarCategories.propTypes = {
    categories: PropTypes.array,
    categoriesActives: PropTypes.array
}