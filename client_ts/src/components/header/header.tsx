import React from 'react';
import styled from "styled-components";
import logo from '../../assets/logo.svg'
import RegBTN from "../auth/registration/regBTN";
import LoginBTN from "../auth/login/loginBTN";
import {NavLink} from "react-router-dom";

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  height: 48px;
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px;
`

const Logo = styled.img`
  padding: 10px;
`

const Links = styled.div`
  display: flex;
  padding: 0px;
  margin: 0;
`

const Header = () => {

    return (
        <Main>
            <Logo src={logo} alt='whatyougonnado?'/>
            <Links>
                <NavLink to='/registration'><RegBTN/></NavLink>
                <NavLink to='/login'><LoginBTN/></NavLink>
            </Links>
        </Main>
    );
};

export default Header;