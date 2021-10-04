import React from 'react';
import logo from '../assets/logo.svg'
import RegBTN from "../auth/registration/regBTN";
import LoginBTN from "../auth/login/loginBTN";
import {NavLink} from "react-router-dom";
import {Links, Main, Logo} from './headerStyles'


const Header = () => {

    // if (!state.auth.isAuthed) {
    //     return (
    //         <Main>
    //             <Logo src={logo} alt='whatyougonnado?'/>
    //             <Links>
    //                 <NavLink to='/registration'><RegBTN/></NavLink>
    //                 <NavLink to='/login'><LoginBTN/></NavLink>
    //             </Links>
    //             <Redirect to='/login'/>
    //
    //         </Main>
    //     );
    // }
    return (
        <Main>
            <Logo src={logo} alt='whatyougonnado?'/>
            <Links>
                <NavLink to='/tasks'>Tasks</NavLink>
                <NavLink to='/registration'><RegBTN/></NavLink>
                <NavLink to='/login'><LoginBTN/></NavLink>
            </Links>
        </Main>
    )


};

export default Header;