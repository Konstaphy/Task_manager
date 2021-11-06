import React, {useEffect} from 'react';
import styled from "styled-components";
import {useTypedSelector} from "../../hooks/hooks";

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  font-size: 16px;
`

const ActiveTask = () => {
    const state = useTypedSelector(state => state)
    useEffect(() => {

    }, [])

    return (
        <Main>
            <Title>
                {state.tasks.active_task?.text}
            </Title>
        </Main>
    );
};

export default ActiveTask;