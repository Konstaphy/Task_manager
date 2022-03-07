import React, { FC } from "react";
import { useTypedSelector } from "hooks/hooks";
import { useDispatch } from "react-redux";
import "./profile.scss";

const Profile: FC = () => {
    const state = useTypedSelector(state => state.user);
    const dispatch = useDispatch();

    const signOut = () => {
        console.log("huy");
        // axiosInstance.post("/api/logout").then(() => {
        //     dispatch({ type: AuthActionTypes.setLoggedOut });
        // });
    };

    return (
        <div className={"profile"}>
            <h1 className={"profile__username"}>{state.user?.name}</h1>
            <h3 className={"profile__credentials"}>
                <p className={"profile__credentials__email"}>{state.user?.email}</p>
                <hr className={"profile__credentials__hr"} />
                <p className={"profile__credentials__id"}>{state.user?.userId}</p>
            </h3>
            <button type="button" onClick={() => signOut()} className={"profile__sign-out-button"}>
                Sign out
            </button>
        </div>
    );
};

export default Profile;
