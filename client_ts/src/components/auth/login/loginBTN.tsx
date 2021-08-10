import React from 'react';
import styled from "styled-components";


const Space = styled.button`
  text-decoration: none;
  border: 1px solid #41DCD3;
  background-color: white;
  font-size: 14px;
  line-height: 28px;
  padding: 0px 30px;
  border-radius: 30px;
  height: 34px;
  margin: 7px 10px;
  color: black;
  font-family: 'Quantico', sans-serif;

  &:hover {
    background-color: #f1fff8;
  }
`


const LoginBTN = () => {
    return (
        <Space>
            login
        </Space>
    );
};

export default LoginBTN;