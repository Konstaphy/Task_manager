import React from 'react';
import {Main, TaskTitle} from './taskStyles'

interface taskType {
    text: string,
    completed: boolean
}

const Task = ({text, completed}: taskType) => {

    return (
        <Main>
            <TaskTitle>
                <p>{text}</p>
            </TaskTitle>
        </Main>
    );
};

export default Task;