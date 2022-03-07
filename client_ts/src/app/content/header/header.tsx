import React, { FC } from "react";
import logo from "assets/logo.svg";
import "./header.scss";
import LoggedInHeaderLinks from "./linkTypes/loggedInHeaderLinks/loggedInHeaderLinks";
import LoggedOutHeaderLinks from "./linkTypes/loggedOutHeaderLinks/loggedOutHeaderLinks";
import { useTypedSelector } from "../../../redux/store";

const Header: FC = () => {
    const state = useTypedSelector(state => state.user);

    const renderLinks = () => {
        if (state.user) {
            return <LoggedInHeaderLinks />;
        }
        return <LoggedOutHeaderLinks />;
    };

    return (
        <main className={"header"}>
            <img className={"header__logo"} src={logo} alt="whatyougonnado?" />
            <div className={"header__links"}>{renderLinks()}</div>
        </main>
    );
};

export default Header;
