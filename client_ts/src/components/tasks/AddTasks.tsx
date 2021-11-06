import React, {ChangeEvent} from 'react';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/hooks";
import {tasksActionTypes} from "../../Redux/reducers/tasksTypes";
import axiosInstance from "../../server";

const AddTasks = () => {
    const dispatch = useDispatch()
    const state = useTypedSelector(state => state)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: tasksActionTypes.setNewTaskText, payload: e.target.value})
    }

    const addTask = () => {
        axiosInstance.post('/api/createTask', {
            text: state.tasks.newTaskText,
            date: new Date(),
            user_id: state.auth.user_id
        }).then(() => {
            dispatch({type: tasksActionTypes.setNewTaskText, payload: ""})
            axiosInstance.get(`/api/tasks/${state.auth.user_id}`).then((r) => {
                dispatch({type: tasksActionTypes.setTasks, payload: r.data})
            })
        })
    }
    return (
        <div>
            Add new post
            <input type="text" value={state.tasks.newTaskText} onChange={(e) => handleChange(e)}/>
            <button onClick={() => addTask()}>Add task</button>
        </div>
    );
};

export default AddTasks;