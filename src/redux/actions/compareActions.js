// export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
// export const DELETE_FROM_COMPARE = "DELETE_FROM_COMPARE";

import { types } from "../../types/types";

// add to compare
export const addToCompare = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Added To Compare", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch({ type: types.addToCompare, payload: item });
  };
};

// delete from compare
export const deleteFromCompare = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Compare", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: types.deleteFromCompare, payload: item });
  };
};
