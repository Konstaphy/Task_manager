import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { setupStore } from "redux/store";
import App from "./app/app";
import "font.css";

ReactDOM.render(
    <Provider store={setupStore()}>
        <App />
    </Provider>,
    document.getElementById("root")
);
