import React from "react";
import { useTypedSelector } from "../../../redux/store";
import LoggedInHeaderLinks from "./loggedInHeaderLinks/loggedInHeaderLinks";
import LoggedOutHeaderLinks from "./loggedOutHeaderLinks/loggedOutHeaderLinks";

interface LinksProps {}

const Links: React.FC<LinksProps> = () => {
    const state = useTypedSelector(state => state.user);

    if (state.user) {
        return <LoggedInHeaderLinks />;
    }
    return <LoggedOutHeaderLinks />;
};

export default Links;
