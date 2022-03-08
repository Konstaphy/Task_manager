import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "app/header/header";
import "./app.css";
import { getCurrent } from "../redux/actionCreators/auth/getCurrent";
import { useTypedDispatch } from "../redux/store";
import Router from "./router/router";

const App: FC = () => {
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getCurrent());
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <Router />
        </BrowserRouter>
    );
};

export default App;
