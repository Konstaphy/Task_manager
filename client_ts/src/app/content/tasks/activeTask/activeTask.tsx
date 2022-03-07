import React, { FC } from "react";
import "./activeTask.scss";
// import { useDispatch } from "react-redux";
import { useTypedSelector } from "hooks/hooks";
// import axiosInstance from "server";

const ActiveTask: FC = () => {
    const { tasks } = useTypedSelector(state => state.tasks);
    // TODO: все запросы в апи сервис
    // const DeleteTask = () => {
    //     axiosInstance.post("/api/deleteTask", { task_id: state.tasks.active_task?.task_id }).then(() => {
    //         axiosInstance.get(`/api/tasks/${state.auth.userId}`).then(r => {
    //             dispatch({ type: tasksActionTypes.setTasks, payload: r.data });
    //             dispatch({ type: tasksActionTypes.setTaskToActive, payload: null });
    //         });
    //     });
    // };
    // if (!state.tasks.active_task) {
    //     return <></>;
    // }
    return (
        <div className={"active-task"}>
            <div className={"active-task__instance"}>
                <p className={"active-task__title"}>{tasks ? tasks[0]?.message : ""}</p>
                <div className={"active-task__delete-button"}>
                    <p>&#10006;</p>
                </div>
            </div>
        </div>
    );
};

export default ActiveTask;
