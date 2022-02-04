import React, { FC } from "react";
import logo from "../assets/logo.svg";
import { useTypedSelector } from "../../hooks/hooks";
import "./header.scss";
import LoggedInHeaderLinks from "./linkTypes/loggedInHeaderLinks/loggedInHeaderLinks";
import LoggedOutHeaderLinks from "./linkTypes/loggedOutHeaderLinks/loggedOutHeaderLinks";

const Header: FC = () => {
    const state = useTypedSelector(state => state.auth);

    const renderLinks = () => {
        if (state.logged) {
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
