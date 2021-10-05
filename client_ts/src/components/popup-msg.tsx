import React from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {authActionTypes} from "../Redux/reducers/authTypes";

interface propsInterface {
    text: null | string,
    error: boolean
}

interface BlockProps {
    readonly error: boolean;
}

const Block = styled.div<BlockProps>`
  background-color: #fff;
  padding: 3px;
  position: fixed;
  bottom: 20px;
  margin: auto;
  left: 0;
  right: 0;
  display: flex;
  width: 50%;
  font-size: 12px;
  max-width: 320px;
  border: 1px solid ${props => props.error ? "red" : "gray"};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  font-family: 'Quantico', sans-serif;
  height: auto;
  flex-direction: column;
  cursor: pointer;

  h4 {
    margin: 0;
  }

  p {
    font-size: 8px;
    margin: 0;
  }
`

const PopupMsg = (props: propsInterface) => {
    const dispatch = useDispatch()
    const closeMsg = () => {
        dispatch({type: authActionTypes.setError, payload: null})
    }
    return (
        <Block error={props.error} onClick={() => closeMsg()}>
            <h4>{props.text}</h4>
            <p>Click to close the message</p>
        </Block>
    );
};

export default PopupMsg;