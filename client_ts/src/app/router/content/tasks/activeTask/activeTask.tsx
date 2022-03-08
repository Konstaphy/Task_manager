import React, { FC } from "react";
import "./activeTask.scss";
import { useTypedDispatch, useTypedSelector } from "../../../../../redux/store";
import { TasksPages } from "../../../../../redux/reducers/tasks/tasksSlice";
import AddTasks from "../addTasks/addTasks";
import { deleteTask } from "../../../../../redux/actionCreators/tasks/deleteTask";

const ActiveTask: FC = () => {
    const tasksState = useTypedSelector(state => state.tasks);
    const dispatch = useTypedDispatch();

    const currentTask = tasksState.tasks?.find(task => task.taskId === tasksState.activeTaskId);

    const removeTask = () => {
        if (currentTask) dispatch(deleteTask(currentTask.taskId));
    };
    if (tasksState.currentPage === TasksPages.new) {
        return <AddTasks />;
    }
    return (
        <div className="active-task">
            <div className="active-task__instance">
                <p className="active-task__title">{currentTask?.message}</p>
                <p className="active-task__title">{currentTask?.description}</p>
                <div className="active-task__delete-button" onClick={removeTask}>
                    <p>&#10006;</p>
                </div>
            </div>
        </div>
    );
};

export default ActiveTask;
