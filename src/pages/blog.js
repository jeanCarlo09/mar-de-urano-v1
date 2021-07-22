import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";
import { graphql } from "gatsby";

import BlogApp from "../components/BlogApp";
import rootReducer from "../redux/reducers/rootReducer";
import MarDeUranoApp from "../components/MarDeUranoApp";
import { fetchBlogs, postSingleInfo } from "../redux/actions/blogActions";


const Blog = ({ data, location }) => {
  let store;

  const posts = data.allContentfulBlogPost.nodes;
  const categories = data.allContentfulBlogCategories.nodes;

  const handle = location.search.substring(1, location.search.length);

  if (typeof window !== `undefined`) {
    store = createStore(
      rootReducer,
      load(),
      composeWithDevTools(applyMiddleware(thunk, save()))
    );
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }

  (handle != '' && handle != undefined) ? store.dispatch(postSingleInfo(handle)) : store.dispatch(fetchBlogs(posts));

  return (
    <Provider store={store}>
      <MarDeUranoApp>
        <BlogApp categories={categories}></BlogApp>
      </MarDeUranoApp>
    </Provider>
  );
};

export const query = graphql`
query BlogPosts {
  allContentfulBlogPost(sort: { fields: [date] }) {
    nodes {
      id
      title
      description {
        description
        childMarkdownRemark {
          html
        }
      }
      date
      handle
      author {
       name
      }
      image {
        fixed(width: 840, quality: 100) {
          src
        }
      }
      categories {
        handle
        id
      }
    }
  }

  allContentfulBlogCategories(sort: { fields: [title] }) {
    nodes {
      id
      title
      handle
      blog_post {
        id
      }
    }
  }
}`;


export default Blog;
