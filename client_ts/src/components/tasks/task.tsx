import React from 'react';
import {Main, TaskDescription, TargetButton, TaskTitle, TaskTitleNav, TaskTitleDesc} from './taskStyles'

const Task = () => {
    return (
        <Main>
            <TargetButton>
                <span>
                    o
                </span>
            </TargetButton>
            <TaskDescription>
                <TaskTitle>
                    <p>Hello</p>
                </TaskTitle>
                <TaskTitleDesc>
                    <p>Hello</p>
                </TaskTitleDesc>
                <TaskTitleNav>
                    <p>Hello</p>
                </TaskTitleNav>
            </TaskDescription>
        </Main>
    );
};

export default Task;