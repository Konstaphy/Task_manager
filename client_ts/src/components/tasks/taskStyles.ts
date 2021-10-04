import styled from "styled-components";

export const Main = styled.div`
  height: 60px;
  display: grid;
  width: 100%;
  background-color: #555;
  grid-template-columns: 60px 1fr;
`

export const TaskDescription = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`

export const TargetButton = styled.div`
  display: grid;
  background-color: #333;
  margin: auto;
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 48px;
  line-height: 48px;
`

export const TaskTitle = styled.div`
  width: 100%;
  height: 20px;
  padding: 0;
  margin: 0;

  p {
    font-size: 14px;
    margin: 0;
    text-align: left;
  }
`
export const TaskTitleDesc = styled.div`
  width: 100%;
  height: 20px;
  padding: 0;
  margin: 0;

  p {
    font-size: 12px;
    margin: 0;
    text-align: left;
  }
`
export const TaskTitleNav = styled.div`
  width: 100%;
  height: 20px;
  padding: 0;

  margin: 0;

  p {
    font-size: 12px;
    margin: 0;
    padding: 0;
    text-align: left;
  }
`