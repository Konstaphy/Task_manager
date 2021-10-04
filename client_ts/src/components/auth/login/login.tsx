import React from 'react';
import logo from '../../assets/logo.svg'
import {Box, Inp, Form, LoginForm, Logo, Submit, DescInp} from "./loginStyles";


const Login: React.FC = () => {

    return (
        <Box>
            <LoginForm>
                <Logo>
                    <img src={logo} alt=""/>
                    <p>Log in to your account</p>
                </Logo>
                <Form>
                    <DescInp>
                        Username
                    </DescInp>
                    <Inp type='text'/>
                    <DescInp>
                        Password
                    </DescInp>
                    <Inp type='text'/>
                    <Submit>
                        <button>
                            Login
                        </button>
                    </Submit>
                </Form>
            </LoginForm>
        </Box>
    );
};

export default Login;