import { types } from '../../types/types';


export const fetchBlogs = (posts) => {
    return dispatch => {
        dispatch({
            type: types.fetchBlogSuccess,
            payload: posts
        });
    }
}

export const postSingleInfo = (id) => {
    return dispatch => {
        dispatch({
            type: types.postSingleInfo,
            payload: id
        });
    }
}

export const addActiveCategory = (category) => {
    return dispatch => {
        dispatch({
            type: types.addActiveCategory,
            payload: category
        });
    }
}

export const removeActiveCategory = (category) => {
    return dispatch => {
        dispatch({
            type: types.removeActiveCategory,
            payload: category
        });
    }
}