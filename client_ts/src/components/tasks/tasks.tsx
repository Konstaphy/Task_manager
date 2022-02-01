import React, { FC, useEffect } from "react";
import { Main, RightBox, LeftBox, Add } from "./tasksStyles";
import Task from "./task";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/hooks";
import axiosInstance from "../../server";
import { tasksActionTypes, task } from "../../redux/reducers/tasksTypes";
import ActiveTask from "./activeTask";
import AddTasks from "./addTasks";

const Tasks: FC = (): JSX.Element => {
    const state = useTypedSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        axiosInstance.get(`/api/tasks/${state.auth.user_id}`).then(r => {
            dispatch({ type: tasksActionTypes.setTasks, payload: r.data });
        });
    }, [state.auth.user_id, dispatch]);

    const setActive = (task: task) => {
        dispatch({ type: tasksActionTypes.setTaskToActive, payload: task });
    };

    const setAdding = () => {
        dispatch({ type: tasksActionTypes.toggleType });
    };

    return (
        <Main>
            <LeftBox>
                <p>Tasks</p>
                {state.tasks.tasks.map(elem => {
                    return (
                        <div onClick={() => setActive(elem)} key={elem.task_id}>
                            <Task text={elem.text} completed={elem.completed} />
                        </div>
                    );
                })}
                <Add
                    onClick={() => {
                        setAdding();
                    }}
                >
                    whatyougonnado?
                </Add>
            </LeftBox>
            <RightBox>{state.tasks.type === "ADDING" ? <AddTasks /> : <ActiveTask />}</RightBox>
        </Main>
    );
};

export default Tasks;
