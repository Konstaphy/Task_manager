import styled from "styled-components";

export const Main = styled.main`
    display: flex;
    justify-content: space-between;
    height: 48px;
    padding: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px;
`;

export const Logo = styled.img`
    padding: 10px;
`;

export const Links = styled.div`
    display: flex;
    padding: 0;
    margin: 0;
`;

export const Button = styled.div`
    text-decoration: none;
    border: none;
    font-size: 12px;
    line-height: 48px;
    margin: auto 10px;
    color: black;
    font-family: "Quantico", sans-serif;
    text-underline: none;

    &:hover,
    .active & {
        text-shadow: 1px 1px 0 #41dcd3;
    }
`;
