import styled, {createGlobalStyle} from "styled-components";
import {BrowserRouter as Router} from "react-router-dom";

export const MainTheme = createGlobalStyle`

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

  * {
    font-family: 'Quantico', sans-serif;
  }
`

export const SDiv = styled(Router)`
  padding: 0;
  margin: 0;
`