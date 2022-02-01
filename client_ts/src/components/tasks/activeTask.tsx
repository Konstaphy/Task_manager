import React, { FC } from "react";
import styled from "styled-components";
import { useTypedSelector } from "../../hooks/hooks";
import axiosInstance from "../../server";
import { tasksActionTypes } from "../../Redux/reducers/tasksTypes";
import { useDispatch } from "react-redux";

const Main = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    font-size: 16px;
`;

const DeleteButton = styled.div`
    width: 200px;
    height: 50px;
    background-color: indianred;
`;

const ActiveTask: FC = () => {
    const state = useTypedSelector(state => state);
    const dispatch = useDispatch();

    const DeleteTask = () => {
        axiosInstance.post("/api/deleteTask", { task_id: state.tasks.active_task?.task_id }).then(() => {
            axiosInstance.get(`/api/tasks/${state.auth.user_id}`).then(r => {
                dispatch({ type: tasksActionTypes.setTasks, payload: r.data });
                dispatch({ type: tasksActionTypes.setTaskToActive, payload: null });
            });
        });
    };
    return (
        <Main>
            <Title>
                {state.tasks.active_task?.text}
                {state.tasks.active_task === null ? (
                    <></>
                ) : (
                    <DeleteButton onClick={() => DeleteTask()}>Delete</DeleteButton>
                )}
            </Title>
        </Main>
    );
};

export default ActiveTask;
