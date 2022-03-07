import React, { FC, useEffect } from "react";
import "../font.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Header from "app/content/header/header";
import Profile from "app/content/profile/profile";
import "./app.css";
import { ApiService } from "service/api/apiService";
import { UserStore } from "redux/reducers/user/userSlice";
import { CommonStore } from "../redux/reducers/commonSlice";
import Tasks from "./content/tasks/tasks";
import { getCurrent } from "../redux/actionCreators/getCurrent";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../redux/store";

const App: FC = () => {
    const userState = useTypedSelector(state => state.user);
    const globalState = useTypedSelector(state => state.common);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrent());
    }, []);

    if (globalState.fetching) {
        return <>Loading...</>;
        // return <ModalMessage error={false} text="Loading..." />;
    }
    // if (!state.user) {
    //     return <></>;
    // return (
    //     <BrowserRouter>
    //         <div className="deleting">
    //             <Header />
    //             <Route path="/registration">
    //                 <Registration />
    //             </Route>
    //             <Route path="/login">
    //                 <Login />
    //             </Route>
    //             <Route exact path="*">
    //                 <Redirect to="/login" />
    //             </Route>
    //         </div>
    //     </BrowserRouter>
    // );
    // }
    return (
        <BrowserRouter>
            <Header />
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
        </BrowserRouter>
    );
};

export default App;
