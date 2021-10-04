import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 48px);
  width: 100%;
`
export const LoginForm = styled.div`
  height: 500px;
  max-width: 620px;
  width: 100%;
  margin: 100px auto;
`
export const Logo = styled.div`
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
export const Form = styled.div`
  margin: auto;
  width: 100%;
  max-width: 620px;
  height: auto;
  display: grid;
`
export const DescInp = styled.p`
  font-family: 'Quantico', sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  padding: 15px 0 5px 30px;
  margin: 0;
`
export const Inp = styled.input`
  font-size: 18px;
  padding: 7px 20px;
  border: #656565 2px solid;
  font-family: 'Quantico', sans-serif;
  width: calc(100% - 44px);

  &:focus {
    outline: none;
  }
`
export const Submit = styled.div`
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