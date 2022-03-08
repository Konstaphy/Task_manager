import React, { FC } from "react";
import logo from "assets/logo.svg";
import "./header.scss";
import Links from "./links/links";

const Header: FC = () => {
    return (
        <main className="header">
            <img className="header__logo" src={logo} alt="whatyougonnado?" />
            <div className="header__links">
                <Links />
            </div>
        </main>
    );
};

export default Header;
