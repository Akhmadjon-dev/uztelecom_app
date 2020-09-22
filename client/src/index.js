import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import WebFont from "webfontloader";
import store from "./store";
import "./styles/normalize.css";
import "./styles/style.css";

WebFont.load({
  google: {
    families: ["Quicksand:300,400,500,700", "Roboto:100,400"],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
