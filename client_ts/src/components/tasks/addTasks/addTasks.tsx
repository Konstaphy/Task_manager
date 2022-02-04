import React, { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { tasksActionTypes } from "../../../redux/reducers/tasksTypes";
import axiosInstance from "../../../server";
import { useTypedSelector } from "../../../hooks/hooks";
import "./addTasks.scss";

const AddTasks: FC = () => {
    const dispatch = useDispatch();
    const state = useTypedSelector(state => state);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: tasksActionTypes.setNewTaskText, payload: e.target.value });
    };

    const addTask = () => {
        if (state.tasks.newTaskText.length > 2)
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
        <div className={"add-task__button"}>
            <p>Add new task</p>
            <input type="text" value={state.tasks.newTaskText} onChange={e => handleChange(e)} placeholder={"title"} />
            <button onClick={() => addTask()}>Add task</button>
        </div>
    );
};

export default AddTasks;
