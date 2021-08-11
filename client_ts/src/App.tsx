import React, {useEffect, useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import Header from "./components/header/header";
import './Font.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Registration from "./components/auth/registration/reg";
import Login from "./components/auth/login/login";
import Tasks from "./components/tasks/tasks";
import {refresh} from "./http/api";
import {useDispatch} from "react-redux";
import {actionUsersTypes} from "./models/authTypes";

const MainTheme = createGlobalStyle`

  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .wrapper {
    max-width: 920px;
    margin: auto;
  }

  label, input {
    cursor: pointer;
  }
`

const SDiv = styled(Router)`
  padding: 0;
  margin: 0;
`


const App = () => {

    const [payload, setPayload] = useState(null)
    const [fetched, setFetched] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        refresh().then(res => {
            setPayload(res)
        }).finally(() => {
            setFetched(true)
        })
    }, [])

    if (payload && (typeof payload == "object")) {
        dispatch({type: actionUsersTypes.login, payload: payload})
    }


    if (!fetched) {
        return (
            <>Loading...</>
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

