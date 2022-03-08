import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import "./loggedOutHeaderLinks.scss";
import RegistrationButton from "app/router/authContent/signUp/signUpButton/registrationButton";
import LoginButton from "app/router/authContent/login/loginButton/loginButton";

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
