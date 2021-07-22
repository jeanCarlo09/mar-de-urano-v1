export const FETCH_COLLECTIONS_SUCCESS = "FETCH_COLLECTIONS_SUCCESS";

const fetchCollectionsSuccess = collections => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});

// fetch collections
export const fetchCollections = collections => {
  return dispatch => {
    dispatch(fetchCollectionsSuccess(collections));
  };
};
