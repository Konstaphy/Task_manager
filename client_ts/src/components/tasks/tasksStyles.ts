import styled from "styled-components";

export const Main = styled.main`
  height: calc(100vh - 48px);
  width: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: auto 1fr;
`

export const LeftBox = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 5px;
`

export const RightBox = styled.div`
  width: 100%;
  border-left: solid 1px rgba(0, 0, 0, 0.1);
`

export const Add = styled.div`
  color: #000;
  width: 100%;
  background-color: #41DCD3;
  height: 30px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.22);
`