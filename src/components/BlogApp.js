import React from 'react';
import PropTypes from 'prop-types';

import ShopLayout from './layouts/ShopLayout';
import BlogSideBar from './blog/BlogSideBar';
import BlogPostList from './blog/BlogPostList';

const BlogApp = ({ categories }) => {
    return (
        <ShopLayout headerTop="visible">
            <div className="shop-area pt-95 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <BlogSideBar categories={categories} />
                        <BlogPostList />
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}

BlogApp.propTypes = {
    categories: PropTypes.array
}

export default BlogApp;