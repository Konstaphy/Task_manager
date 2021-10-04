import React, {useEffect} from 'react';
import './Font.css'
import {Route} from 'react-router-dom'
import Header from "./components/header/header";
import Registration from "./components/auth/registration/reg";
import Login from "./components/auth/login/login";
import Tasks from "./components/tasks/tasks";
import {SDiv, MainTheme} from './appStyles'
import {useTypedSelector} from "./hooks/hooks";
import axiosInstance from "./server";


const App = () => {
    const state = useTypedSelector(state => state.auth)

    useEffect(() => {
        axiosInstance.get('/api/refresh').then((r) => {
            // localStorage.setItem('token', r.data.accessToken);
            console.log(r)

        })

    }, [])

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

