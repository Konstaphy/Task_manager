import React, {FC} from 'react';
import {Main, RightBox, LeftBox} from './tasksStyles'
import Task from "./task";


const Tasks: FC = () => {

    return (
        <Main>
            <RightBox>
                <p>Tasks</p>
            </RightBox>
            <LeftBox>
                <Task/>
            </LeftBox>
        </Main>
    )
};

export default Tasks;