import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import "./loggedInHeaderLinks.scss";

const LoggedInHeaderLinks: FC = () => {
    return (
        <>
            <NavLink to="/tasks">
                <div className={"header__links__button"}>Tasks</div>
            </NavLink>
            <NavLink to="/profile">
                <div className={"header__links__button"}>Profile</div>
            </NavLink>
        </>
    );
};

export default LoggedInHeaderLinks;
