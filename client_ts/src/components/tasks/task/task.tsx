import React from "react";
import "./task.scss";

interface taskType {
    text: string;
    completed: boolean;
}

const Task = ({ text }: taskType): JSX.Element => {
    return (
        <div className={"task"}>
            <div className={"task__title"}>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Task;
