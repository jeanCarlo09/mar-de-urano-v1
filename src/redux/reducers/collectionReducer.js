import { FETCH_COLLECTIONS_SUCCESS } from "../actions/collectionActions";

const initState = {
  collections: [],
};

const collectionReducer = (state = initState, action) => {
  if (action.type === FETCH_COLLECTIONS_SUCCESS) {
    return {
      ...state,
      collections: action.payload,
    };
  }

  return state;
};

export default collectionReducer;
