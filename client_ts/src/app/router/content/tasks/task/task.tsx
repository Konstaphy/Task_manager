import React from "react";
import "./task.scss";
import { TaskDTO } from "../../../../../../../models/dtos/taskDTO";
import { useTypedDispatch } from "../../../../../redux/store";
import { TasksStore } from "../../../../../redux/reducers/tasks/tasksSlice";

interface TaskProps {
    task: TaskDTO;
}

const Task: React.FC<TaskProps> = (props): JSX.Element => {
    const dispatch = useTypedDispatch();
    const setCurrent = () => {
        dispatch(TasksStore.actions.setCurrent(props.task.taskId));
    };
    return (
        <div className="task" onClick={setCurrent}>
            <div className="task__title">
                <p>{props.task.message}</p>
            </div>
        </div>
    );
};

export default Task;
