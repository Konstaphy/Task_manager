import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import "./addTasks.scss";
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store";
import { ApiService } from "../../../../service/api/apiService";
import { TaskRequestDTO, TaskResponseDTO } from "../../../../../../models/taskResponseDTO";
import { createTask } from "../../../../redux/actionCreators/createTask";

const AddTasks: FC = () => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const dispatch = useTypedDispatch();
    const tasksState = useTypedSelector(state => state.tasks);
    const usersState = useTypedSelector(state => state.user);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    };

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
            <input type="text" value={taskName} onChange={e => handleChange(e)} placeholder="title" />
            <button onClick={addTask}>Add task</button>
        </div>
    );
};

export default AddTasks;
