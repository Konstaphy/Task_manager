import React, { FC } from "react";
import { useDispatch } from "react-redux";
import "./profile.scss";
import { ApiService } from "../../../service/api/apiService";
import { UserStore } from "../../../redux/reducers/user/userSlice";
import { useTypedSelector } from "../../../redux/store";
import { logout } from "../../../redux/actionCreators/logout";

const Profile: FC = () => {
    const state = useTypedSelector(state => state.user);
    const dispatch = useDispatch();

    const signOut = async () => {
        dispatch(logout());
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
