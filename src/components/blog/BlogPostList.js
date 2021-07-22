import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import Paginator from "react-hooks-paginator";

import { BlogPost } from './BlogPost';
import { BlogPostCard } from './BlogPostCard';
import { postsWithCategoriesActives } from '../../helpers/blog';


const BlogPostList = ({ posts, single, postActive, categoriesActives }) => {

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [data, setData] = useState([...posts]);

    useEffect(() => {
        categoriesActives && setData(postsWithCategoriesActives(posts, categoriesActives));
    }, [categoriesActives]);


    const pageLimit = 5;

    useEffect(() => {
        setCurrentData(data.slice(offset, offset + pageLimit));
    }, [offset, data]);


    return (
        <div className="col-xl-8 col-lg-7 order-1 order-lg-2">

            <div className="post">
                {
                    (single)
                        ?
                        <BlogPost post={postActive}></BlogPost>
                        :
                        <>

                            {
                                currentData.map(post => (
                                    <BlogPostCard key={post.id} post={post} />
                                ))
                            }

                            <div className="pro-pagination-style text-center mt-30">
                                <Paginator
                                    totalRecords={data.length}
                                    pageLimit={pageLimit}
                                    pageNeighbours={2}
                                    setOffset={setOffset}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    pageContainerClass="mb-0 mt-0"
                                    pagePrevText="«"
                                    pageNextText="»"
                                />
                            </div>
                        </>
                }
            </div>

        </div>
    );
}

BlogPostList.propTypes = {
    posts: PropTypes.array.isRequired,
    single: PropTypes.bool.isRequired,
    postActive: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        posts: state.blogData.posts,
        single: state.blogData.single,
        postActive: state.blogData.postActive,
        categoriesActives: state.blogData.categoriesActives
    }
}

export default connect(mapStateToProps)(BlogPostList);