import React, {useEffect} from 'react';
import './Font.css'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'
import Header from "./components/header/header";
import Registration from "./components/auth/registration/reg";
import Login from "./components/auth/login/login";
import Tasks from "./components/tasks/tasks";
import {SDiv, MainTheme} from './appStyles'
import {useTypedSelector} from "./hooks/hooks";
import axiosInstance from "./server";
import {useDispatch} from "react-redux";
import {authActionTypes} from "./Redux/reducers/authTypes";


const App = () => {
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        axiosInstance.get('/api/refresh').then((r) => {
            localStorage.setItem('token', r.data.accessToken);
            dispatch({type: authActionTypes.setUsername, payload: r.data.user.username})
            dispatch({type: authActionTypes.setEmail, payload: r.data.user.email})
            dispatch({type: authActionTypes.setUserID, payload: r.data.user.user_id})
            dispatch({type: authActionTypes.setLogged})

        }).finally(() => {
            dispatch({type: authActionTypes.setFetched})

        })
    }, [dispatch])

    if (!state.fetched) {
        return (
            <h1>Loading...</h1>

        )
    }

    return (
        <SDiv>
            <MainTheme/>
            <Header/>
            <div className="wrapper">
                <Route path='/registration'><Registration/></Route>
                <Route path='/login'><Login/></Route>
                <Route path='/tasks'><Tasks/></Route>
            </div>
        </SDiv>
    );

};

export default App;

