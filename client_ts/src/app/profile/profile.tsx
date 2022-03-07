import React, { FC } from "react";
import { useTypedSelector } from "hooks/hooks";
import axiosInstance from "server";
import { useDispatch } from "react-redux";
import { AuthActionTypes } from "redux/reducers/authTypes";
import "./profile.scss";

const Profile: FC = () => {
    const state = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    const signOut = () => {
        axiosInstance.post("/api/logout").then(() => {
            dispatch({ type: AuthActionTypes.setLoggedOut });
        });
    };

    return (
        <div className={"profile"}>
            <h1 className={"profile__username"}>{state.username}</h1>
            <h3 className={"profile__credentials"}>
                <p className={"profile__credentials__email"}>{state.email}</p>
                <hr className={"profile__credentials__hr"} />
                <p className={"profile__credentials__id"}>{state.userId}</p>
            </h3>
            <button type="button" onClick={() => signOut()} className={"profile__sign-out-button"}>
                Sign out
            </button>
        </div>
    );
};

export default Profile;
