import { types } from "../../types/types";


const fetchCollectionsSuccess = collections => ({
  type: types.fetchCollectionsSuccess,
  payload: collections,
});

// fetch collections
export const fetchCollections = collections => {
  return dispatch => {
    dispatch(fetchCollectionsSuccess(collections));
  };
};


export const fetchCollectionDetails = (handle) => {
  return dispatch => {
    dispatch({
      type: types.fetchCollectionDetails,
      payload: handle
    });
  }
}