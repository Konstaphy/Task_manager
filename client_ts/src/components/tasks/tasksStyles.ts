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
  color: #fff;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  background-color: #a83a3a;
`