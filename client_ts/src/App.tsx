import React from 'react';
import styled, {createGlobalStyle} from "styled-components";
import Header from "./components/header/header";
import './Font.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Registration from "./components/auth/registration/reg";
import Login from "./components/auth/login/login";

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
    return (
        <SDiv>
            <MainTheme/>
            <Header/>
            <div className="wrapper">
                <Route path='/registration'><Registration/></Route>
                <Route path='/login'><Login/></Route>
            </div>

        </SDiv>
    );
};

export default App;

