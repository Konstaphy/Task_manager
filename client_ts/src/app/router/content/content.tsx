import React from "react";
import { Redirect, Route } from "react-router-dom";
import Tasks from "./tasks/tasks";
import Profile from "./profile/profile";

interface ContentProps {}

const Content: React.FC<ContentProps> = () => {
    return (
        <div className="wrapper">
            <Route path="/tasks">
                <Tasks />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/">
                <Redirect to="/profile" />
            </Route>
        </div>
    );
};

export default Content;
