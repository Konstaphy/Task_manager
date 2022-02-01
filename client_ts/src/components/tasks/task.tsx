import React from "react";
import { Main, TaskTitle } from "./taskStyles";

interface taskType {
    text: string;
    completed: boolean;
}

const Task = ({ text }: taskType): JSX.Element => {
    return (
        <Main>
            <TaskTitle>
                <p>{text}</p>
            </TaskTitle>
        </Main>
    );
};

export default Task;
