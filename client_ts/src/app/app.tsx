import React, { FC, useEffect } from "react";
import "../font.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Header from "app/content/header/header";
import { useTypedDispatch, useTypedSelector } from "hooks/hooks";
import Profile from "app/content/profile/profile";
import "./app.css";
import { ApiService } from "service/api/apiService";
import { UserStore } from "redux/reducers/user/userSlice";
import { CommonStore } from "../redux/reducers/commonSlice";

const App: FC = () => {
    const state = useTypedSelector(state => state.user);
    const globalState = useTypedSelector(state => state.common);
    const dispatch = useTypedDispatch();

    const { setUser } = UserStore.actions;
    const { setFetched } = CommonStore.actions;

    useEffect(() => {
        // todo: async await
        ApiService.GetCurrent()
            .then(r => {
                dispatch(setUser(r));
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                dispatch(setFetched(false));
            });
    }, [dispatch]);

    // if (!globalState.fetching) {
    //     return <ModalMessage error={false} text="Loading..." />;
    // }
    // if (!state.user) {
    //     return (
    //         <BrowserRouter>
    //             <div className="deleting">
    //                 <Header />
    //                 <Route path="/registration">
    //                     <Registration />
    //                 </Route>
    //                 <Route path="/login">
    //                     <Login />
    //                 </Route>
    //                 <Route exact path="*">
    //                     <Redirect to="/login" />
    //                 </Route>
    //             </div>
    //         </BrowserRouter>
    //     );
    // }
    return (
        <BrowserRouter>
            <Header />
            <div className="wrapper">
                {/*<Route path="/tasks">*/}
                {/*    <Tasks />*/}
                {/*</Route>*/}
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
