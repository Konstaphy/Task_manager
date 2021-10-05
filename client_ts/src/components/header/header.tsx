import React from 'react';
import logo from '../assets/logo.svg'
import RegBTN from "../auth/registration/regBTN";
import LoginBTN from "../auth/login/loginBTN";
import {NavLink} from "react-router-dom";
import {Links, Main, Logo, Button} from './headerStyles'
import {useTypedSelector} from "../../hooks/hooks";


const Header = () => {
    const state = useTypedSelector(state => state.auth)

    if (state.logged) {
        return (
            <Main>
                <Logo src={logo} alt='whatyougonnado?'/>
                <Links>
                    <NavLink to='/tasks'><Button>Tasks</Button></NavLink>
                    <NavLink to='/profile'><Button>Profile</Button></NavLink>
                </Links>
            </Main>
        );
    }

    return (
        <Main>
            <Logo src={logo} alt='whatyougonnado?'/>
            <Links>
                <NavLink to='/registration'><RegBTN/></NavLink>
                <NavLink to='/login'><LoginBTN/></NavLink>
            </Links>
        </Main>
    )


};

export default Header;