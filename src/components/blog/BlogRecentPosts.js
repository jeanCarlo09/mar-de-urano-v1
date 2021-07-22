import React from 'react';
import { Link } from 'gatsby';

export const BlogRecentPosts = ({ posts }) => {
    return (

        <section className="widget widget_flone_recent_post">
            <h3 className="widget-title blog-sidebar-title">Recent Posts</h3>
            <ul className="sidebar-project-wrap list-group list-group-flush">

                {
                    posts.map(post => (
                        <li className="blog-sidebar-single mb-10 list-group-item" key={post.id}>
                            <div className="blog-sidebar-single-img">

                                <Link to={`/blog?${post.handle}`} >
                                    <img src={post.image.fixed.src} className="attachment-thumbnail size-thumbnail" alt="" loading="lazy" />
                                </Link>
                            </div>

                            <div className="blog-sidebar-single-content">
                                <h5 className="blog-sidebar-single-content-title">
                                    <Link to={`/blog?${post.handle}`}>{post.title}</Link>
                                </h5>
                            </div>
                        </li>
                    ))
                }
            </ul>

        </section>
    );
}
