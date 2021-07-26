import React from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import PropTypes from "prop-types";

export const BlogPost = ({ post }) => {

    return (
        <div className="blog-post mb-40">
            <div className="header-post mb-30">
                <div className="blog-post-title">
                    <h2>{post.title}</h2>
                </div>

                <div className="blog-post-meta mt-20 mb-10">

                    <span className="post-author">
                        <span className="post-by">
                            {/* <i class="far fa-user"></i> */}
                            <i className="fas fa-user-alt blog-post-meta-icon"></i>{post.author.name}
                        </span>
                    </span>

                    <span className="posted-on ml-4">
                        <i className="fas fa-calendar-alt blog-post-meta-icon"></i>
                        {moment(post.date).format('DD MMM, YYYY')}
                    </span>

                </div>
            </div>

            <div className="blog-post-content">
                <div className="blog-post-content-img mb-20">
                    <img src={post.image.fixed.src} />
                </div>

                <span className="blog-post-content-description">
                    {parse(post.description.childMarkdownRemark.html)}
                </span>

            </div>

        </div>
    );
}

BlogPost.propTypes = {
    post: PropTypes.object
}