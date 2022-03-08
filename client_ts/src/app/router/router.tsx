import React from "react";
import { useTypedSelector } from "../../redux/store";
import Auth from "./authContent/auth";
import Content from "./content/content";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
    const commonStore = useTypedSelector(state => state.common);
    const { user, fetching } = useTypedSelector(state => state.user);
    if (commonStore.fetching || fetching) return <div className="loading"> Loading... </div>;
    if (!user) {
        return <Auth />;
    }
    return <Content />;
};

export default Router;
