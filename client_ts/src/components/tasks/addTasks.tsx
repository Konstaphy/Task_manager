import React, { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/hooks";
import axiosInstance from "../../server";
import styled from "styled-components";
import { tasksActionTypes } from "../../redux/reducers/tasksTypes";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: calc(100% - 48px);

    p {
        font-size: 18px;
        margin: 0;
    }

    input {
        width: 50%;
        font-size: 14px;
        height: 20px;
        padding: 3px;
    }
`;

const AddTasks: FC = () => {
    const dispatch = useDispatch();
    const state = useTypedSelector(state => state);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: tasksActionTypes.setNewTaskText, payload: e.target.value });
    };

    const addTask = () => {
        axiosInstance
            .post("/api/createTask", {
                text: state.tasks.newTaskText,
                date: new Date(),
                user_id: state.auth.user_id,
            })
            .then(() => {
                dispatch({ type: tasksActionTypes.setNewTaskText, payload: "" });
                axiosInstance.get(`/api/tasks/${state.auth.user_id}`).then(r => {
                    dispatch({ type: tasksActionTypes.setTasks, payload: r.data });
                });
            });
    };
    return (
        <Main>
            <p>Add new post</p>
            <input type="text" value={state.tasks.newTaskText} onChange={e => handleChange(e)} />
            <button onClick={() => addTask()}>Add task</button>
        </Main>
    );
};

export default AddTasks;
