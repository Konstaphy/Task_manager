import React from 'react';
import logo from "../../assets/logo.svg";
import {Box, Inp, DescInp, Submit, Privacy, Form, LoginForm, Logo} from "./regStyles";


const Registration: React.FC = () => {

    return (
        <Box>
            <LoginForm>
                <Logo>
                    <img src={logo} alt=""/>
                    <p>Register a new account</p>
                </Logo>
                <Form>
                    <DescInp>
                        Username
                    </DescInp>
                    <Inp type='text'/>
                    <DescInp>
                        Email
                    </DescInp>
                    <Inp type='email'/>
                    <DescInp>
                        Password
                    </DescInp>
                    <Inp type='text'/>

                    <Privacy><input type="checkbox" id='pp'/><label htmlFor="pp">Privacy policy</label></Privacy>
                    <Submit>
                        <button>
                            Register
                        </button>
                    </Submit>
                </Form>
            </LoginForm>
        </Box>
    );
};

export default Registration;