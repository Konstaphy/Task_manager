import React, { FC } from "react";
import "./activeTask.scss";
import { useTypedSelector } from "../../../../../redux/store";
import { TasksPages } from "../../../../../redux/reducers/tasks/tasksSlice";
import AddTasks from "../addTasks/addTasks";

const ActiveTask: FC = () => {
    const tasksState = useTypedSelector(state => state.tasks);

    const currentTask = tasksState.tasks?.find(task => task.taskId === tasksState.activeTaskId);
    // TODO: все запросы в апи сервис
    // const DeleteTask = () => {
    //     axiosInstance.post("/api/deleteTask", { task_id: state.tasks.active_task?.task_id }).then(() => {
    //         axiosInstance.get(`/api/tasks/${state.auth.userId}`).then(r => {
    //             dispatch({ type: tasksActionTypes.setTasks, payload: r.data });
    //             dispatch({ type: tasksActionTypes.setTaskToActive, payload: null });
    //         });
    //     });
    // };
    if (tasksState.currentPage === TasksPages.new) {
        return <AddTasks />;
    }
    return (
        <div className="active-task">
            <div className="active-task__instance">
                <p className="active-task__title">{currentTask?.message}</p>
                <p className="active-task__title">{currentTask?.description}</p>
                <div className="active-task__delete-button">
                    <p>&#10006;</p>
                </div>
            </div>
        </div>
    );
};

export default ActiveTask;
