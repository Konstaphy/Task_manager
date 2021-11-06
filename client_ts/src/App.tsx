import React, {useEffect} from 'react';
import './Font.css'
import {Redirect, Route} from 'react-router-dom'
import Header from "./components/header/header";
import Registration from "./components/auth/registration/reg";
import Login from "./components/auth/login/login";
import Tasks from "./components/tasks/tasks";
import {SDiv, MainTheme} from './appStyles'
import {useTypedSelector} from "./hooks/hooks";
import axiosInstance from "./server";
import {useDispatch} from "react-redux";
import {authActionTypes} from "./Redux/reducers/authTypes";
import Profile from "./components/profile/profile";
import PopupMsg from "./components/popup-msg";


const App = () => {
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        axiosInstance.get('/api/refresh').then((r) => {
            if (r.data.Error) {
                throw new Error(r.data.Description)
            }
            localStorage.setItem('token', r.data.accessToken);
            dispatch({type: authActionTypes.setUsername, payload: r.data.user.username})
            dispatch({type: authActionTypes.setEmail, payload: r.data.user.email})
            dispatch({type: authActionTypes.setUserID, payload: r.data.user.user_id})
            dispatch({type: authActionTypes.setLogged})
        }).catch(e => e).finally(() => {
            dispatch({type: authActionTypes.setFetched})
        })
    }, [dispatch])

    if (!state.fetched) {
        return (
            <PopupMsg error={false} text='Loading...'/>
        )
    }
    if (!state.logged) {
        return (
            <SDiv>
                <Redirect to='/login'/>
                <MainTheme/>
                <Header/>
                <div className="wrapper">
                    <Route path='/registration'><Registration/></Route>
                    <Route path='/login'><Login/></Route>
                </div>

            </SDiv>


        )
    } else {
        return (
            <SDiv>
                {window.location.href.split('/')[3] === "" ? <Redirect to={'/profile'}/> : <></>}
                <MainTheme/>
                <Header/>
                <div className="wrapper">
                    <Route path='/tasks'><Tasks/></Route>
                    <Route path='/profile'><Profile/></Route>
                </div>
            </SDiv>
        );
    }
};

export default App;

