import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import "./loggedOutHeaderLinks.scss";
import RegistrationButton from "app/auth/registration/registrationButton/registrationButton";
import LoginButton from "app/auth/login/loginButton/loginButton";

const LoggedOutHeaderLinks: FC = () => {
    return (
        <>
            <NavLink to="/registration">
                <RegistrationButton />
            </NavLink>
            <NavLink to="/login">
                <LoginButton />
            </NavLink>
        </>
    );
};

export default LoggedOutHeaderLinks;
