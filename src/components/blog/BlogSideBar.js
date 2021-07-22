import React from 'react';

import PropTypes from "prop-types";

import { connect } from 'react-redux';
import { BlogSideBarCategories } from './BlogSideBarCategories';
import { BlogRecentPosts } from './BlogRecentPosts';



const BlogSideBar = ({ categories, posts, categoriesActives }) => {

    return (
        <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12 order-2 order-lg-1 pr-100">

            <aside className="blog-sidebar">

                <BlogSideBarCategories categories={categories} categoriesActives={categoriesActives}></BlogSideBarCategories>
                <BlogRecentPosts posts={posts.slice(0, 4)}></BlogRecentPosts>

            </aside>
        </div>
    );
}

BlogSideBar.propTypes = {
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    categoriesActives: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        posts: state.blogData.posts,
        categoriesActives: state.blogData.categoriesActives
    }
}

export default connect(mapStateToProps)(BlogSideBar);
