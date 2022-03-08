import React, { FC, useState } from "react";
import "./addTasks.scss";
import { useTypedDispatch, useTypedSelector } from "../../../../../redux/store";
import { TaskRequestDTO } from "../../../../../../../models/dtos/taskDTO";
import { createTask } from "../../../../../redux/actionCreators/tasks/createTask";

const AddTasks: FC = () => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const dispatch = useTypedDispatch();
    const usersState = useTypedSelector(state => state.user);

    const addTask = async () => {
        if (!usersState.user?.userId) throw 401;
        const task: TaskRequestDTO = {
            message: taskName,
            description: taskDescription,
            userId: usersState.user?.userId,
        };
        if (taskName.length > 2) dispatch(createTask(task));
    };
    return (
        <div className={"add-task__button"}>
            <p>Add new task</p>
            <input type="taskName" value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="title" />
            <input
                type="taskDescription"
                value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
                placeholder="title"
            />
            <button onClick={addTask}>Add task</button>
        </div>
    );
};

export default AddTasks;
