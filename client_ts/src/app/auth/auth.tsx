import React from "react";
import Header from "../content/header/header";
import { Redirect, Route } from "react-router-dom";
import SignUp from "./registration/signUp";
import Login from "./login/login";

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
    return (
        <div className="deleting">
            <Header />
            <Route path="/registration">
                <SignUp />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route exact path="*">
                <Redirect to="/login" />
            </Route>
        </div>
    );
};

export default Auth;
