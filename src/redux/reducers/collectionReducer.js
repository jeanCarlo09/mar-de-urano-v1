import { types } from "../../types/types";
import { FETCH_COLLECTIONS_SUCCESS } from "../actions/collectionActions";

const initState = {
  collections: [],
  collectionDetail: null
};

const collectionReducer = (state = initState, action) => {

  switch (action.type) {
    case types.fetchCollectionsSuccess:
      return {
        ...state,
        collections: action.payload,
        collectionDetail: null
      };

    case types.fetchCollectionDetails:
      return {
        ...state,
        collectionDetail: state.collections.filter((collection) => collection.handle === action.payload)[0]
      }

    default:
      return state;
  }

};

export default collectionReducer;
