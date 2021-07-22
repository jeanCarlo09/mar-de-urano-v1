import React, { useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";

const MarDeUranoApp = props => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("../translations/english.json"),
          fn: require("../translations/french.json"),
          de: require("../translations/germany.json"),
        },
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">{props.children}</ToastProvider>
  );
};

MarDeUranoApp.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(MarDeUranoApp));
