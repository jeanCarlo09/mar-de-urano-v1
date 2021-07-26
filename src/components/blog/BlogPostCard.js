import React from 'react';
import moment from 'moment';
import PropTypes from "prop-types";
import { Link } from 'gatsby';

export const BlogPostCard = ({ post }) => {

    return (
        <article className="blog-wrap-2 mb-40 ">

            <div className="post-thumbnail blog-img-2">
                <img src={post.image.fixed.src} className="post-image" alt={post.title} loading="lazy" />
            </div>

            <div className="blog-content-2">
                <div className="post-meta">

                    <span className="post-author">
                        <span className="post-by">
                            <i className="fas fa-user-alt post-meta-icon"></i>{post.author.name}
                        </span>
                    </span>

                    <span className="posted-on ml-4">
                        <i className="fas fa-calendar-alt post-meta-icon"></i>
                        {moment(post.date).format('DD MMM, YYYY')}
                    </span>

                    <h2 className="entry-title mt-4 mb-2"> <Link to={`/blog?${post.handle}`} >{post.title}</Link></h2>
                </div>

                <div className="entry-content mt-2">
                    <p className="entry-content-description mb-4">{post.description.description}</p>

                    <Link className="entry-content-readmore" to={`/blog?${post.handle}`} >Read More</Link>
                </div>
            </div>
        </article>
    );

}

BlogPostCard.propTypes = {
    post: PropTypes.object
}
