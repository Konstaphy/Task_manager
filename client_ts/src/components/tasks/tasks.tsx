import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "hooks/hooks";
import axiosInstance from "server";
import { tasksActionTypes, task } from "redux/reducers/tasksTypes";
import Task from "components/tasks/task/task";
import AddTasks from "components/tasks/addTasks/addTasks";
import ActiveTask from "components/tasks/activeTask/activeTask";
import "components/tasks/tasks.scss";

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
        <div className={"tasks"}>
            <div className={"tasks__left"}>
                <p>Tasks</p>
                {state.tasks.tasks.map(elem => {
                    return (
                        <div onClick={() => setActive(elem)} key={elem.task_id}>
                            <Task text={elem.text} completed={elem.completed} />
                        </div>
                    );
                })}
                <button className={"tasks__add-button"} onClick={setAdding}>
                    whatyougonnado?
                </button>
            </div>
            <div className={"tasks__right"}>{state.tasks.type === "ADDING" ? <AddTasks /> : <ActiveTask />}</div>
        </div>
    );
};

export default Tasks;
