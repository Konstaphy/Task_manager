import React, { FC } from "react";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../../hooks/hooks";
import RegistrationButton from "../auth/registration/registrationButton/registrationButton";
import LoginButton from "../auth/login/loginButton/loginButton";
import "./header.scss";

const Header: FC = () => {
    const state = useTypedSelector(state => state.auth);

    if (state.logged) {
        return (
            <main className={"header"}>
                <img className={"header__logo"} src={logo} alt="whatyougonnado?" />
                <div className={"header__links"}>
                    <NavLink to="/tasks">
                        <div className={"header__links__button"}>Tasks</div>
                    </NavLink>
                    <NavLink to="/profile">
                        <div className={"header__links__button"}>Profile</div>
                    </NavLink>
                </div>
            </main>
        );
    }

    return (
        <main className={"header"}>
            <img className={"header__logo"} src={logo} alt="whatyougonnado?" />
            <div className={"header__links"}>
                <NavLink to="/registration">
                    <RegistrationButton />
                </NavLink>
                <NavLink to="/login">
                    <LoginButton />
                </NavLink>
            </div>
        </main>
    );
};

export default Header;
