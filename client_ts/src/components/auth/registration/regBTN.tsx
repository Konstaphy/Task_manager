import React from 'react';
import styled from "styled-components";

const Space = styled.button`
  text-decoration: none;
  border: none;
  background-color: #41DCD3;
  font-size: 14px;
  line-height: 28px;
  padding: 0px 30px;
  border-radius: 30px;
  height: 34px;
  margin: 7px 10px;
  color: black;
  font-family: 'Quantico', sans-serif;

  &:hover {
    background-color: #31CCC3;
  }
`

const RegBTN = () => {
    return (
        <Space>
            register
        </Space>
    );
};

export default RegBTN;