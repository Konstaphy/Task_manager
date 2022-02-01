import React, { FC } from "react";
import "./activeTask.scss";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/hooks";
import axiosInstance from "../../../server";
import { tasksActionTypes } from "../../../redux/reducers/tasksTypes";

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
        <div className={"activeTask"}>
            <div className={"activeTask__title"}>
                {state.tasks.active_task?.text}
                {state.tasks.active_task ? (
                    <></>
                ) : (
                    <div className={"activeTask__delete-button"} onClick={() => DeleteTask()}>
                        Delete
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveTask;
