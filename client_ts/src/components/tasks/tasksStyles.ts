import styled from "styled-components";

export const Main = styled.main`
  height: calc(100vh - 48px);
  width: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: auto 1fr;


`

export const RightBox = styled.div`
  width: 200px;
  padding: 5px;
  border-right: solid 1px rgba(0, 0, 0, 0.1);

  p {
    margin: 10px auto;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
  }
`

export const LeftBox = styled.div`
  width: 100%;
  padding: 5px;

  p {
    margin: 10px auto;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
  }
`