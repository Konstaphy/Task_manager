import React from 'react';
import styled from "styled-components";
import logo from "../../../assets/logo.svg";
import {registration} from "../../../http/api";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {actionUsersTypes} from "../../../models/authTypes";
import {Redirect} from "react-router-dom";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 48px);
  width: 100%;
`
const LoginForm = styled.div`
  height: 500px;
  max-width: 620px;
  width: 100%;
  margin: 100px auto;
`
const Logo = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: auto;
  margin: 10px auto;

  img {
    margin: auto;
    height: 48px;
    padding-right: 10px;
    border-right: black 1px solid;
  }

  p {
    font-family: 'Quantico', sans-serif;
    font-weight: bold;
    font-size: 24px;
    line-height: 48px;
    text-align: right;
    width: 100%;
    height: 48px;
    margin: auto;
  }
`
const Form = styled.div`
  margin: auto;
  width: 100%;
  max-width: 620px;
  height: auto;
  display: grid;
`
const DescInp = styled.p`
  font-family: 'Quantico', sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  padding: 15px 0 5px 30px;
  margin: 0;
`
const Inp = styled.input`
  font-size: 18px;
  padding: 7px 20px;
  border: #656565 2px solid;
  font-family: 'Quantico', sans-serif;
  width: calc(100% - 44px);

  &:focus {
    outline: none;
  }
`
const Submit = styled.div`
  width: 100%;
  margin: 15px auto;
  display: grid;

  button {
    border: none;
    margin: auto;
    width: auto;
    padding: 10px;
    font-family: 'Quantico', sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
`

const Privacy = styled.div`
  margin: auto;
  width: auto;
  padding: 20px;
  font-family: 'Quantico', sans-serif;

  input {
    padding: 5px;
    border: none;
    outline: none;
    background-color: #eee;
    display: inline-block;
  }

  label {
    margin: auto;
    width: auto;
  }
`

const Registration: React.FC = () => {
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const getAccessToken = async () => {
        await registration(state.login.currentUsername, state.login.currentPassword, state.login.currentEmail)
            .then(res => {
                dispatch({type: actionUsersTypes.login, payload: {id: res.user.user_id, token: res.refreshToken}})
            })
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: actionUsersTypes.setEmail, payload: event.target.value})
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: actionUsersTypes.setUsername, payload: event.target.value})
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: actionUsersTypes.setPassword, payload: event.target.value})
    }

    if (state.isAuthed) {
        return <Redirect to='/tasks'/>
    }
    

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
                    <Inp type='text' onChange={handleUsernameChange} value={state.login.currentUsername}/>
                    <DescInp>
                        Email
                    </DescInp>
                    <Inp type='email' onChange={handleEmailChange} value={state.login.currentEmail}/>
                    <DescInp>
                        Password
                    </DescInp>
                    <Inp type='text' onChange={handlePasswordChange} value={state.login.currentPassword}/>

                    <Privacy><input type="checkbox" id='pp'/><label htmlFor="pp">Privacy policy</label></Privacy>
                    <Submit>
                        <button onClick={getAccessToken}>
                            Register
                        </button>
                    </Submit>
                </Form>
            </LoginForm>
        </Box>
    );
};

export default Registration;