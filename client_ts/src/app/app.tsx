import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "app/content/header/header";
import "./app.css";
import { getCurrent } from "../redux/actionCreators/auth/getCurrent";
import { useTypedDispatch, useTypedSelector } from "../redux/store";
import ModalMessage from "../elements/modalMessage/modalMessage";
import { CommonStore } from "../redux/reducers/commonSlice";
import Auth from "./auth/auth";
import Content from "./content/content";

const App: FC = () => {
    const userState = useTypedSelector(state => state.user);
    const globalState = useTypedSelector(state => state.common);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getCurrent());
    }, []);

    if (userState.fetching) {
        return <div className="loading"> Loading... </div>;
    }
    if (!userState.user) {
        return (
            <BrowserRouter>
                <Auth />
                <ModalMessage
                    text={globalState.fetching}
                    resetText={() => dispatch(CommonStore.actions.setFetched(""))}
                />
            </BrowserRouter>
        );
    }
    return (
        <BrowserRouter>
            <Header />
            <Content />
        </BrowserRouter>
    );
};

export default App;
