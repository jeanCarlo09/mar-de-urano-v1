import axios from "axios";
import { types } from "../../types/types";
// export const SET_CURRENCY = "SET_CURRENCY";

export const setCurrency = currencyName => {
  return dispatch => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then(response => {
        const rates = response.data.rates;
        let currencyRate = 0;
        for (const rate in rates) {
          if (rate === currencyName) {
            currencyRate = rates[rate];
          }
        }
        dispatch({
          type: types.setCurrency,
          payload: { currencyName, currencyRate },
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };
};
