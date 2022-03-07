import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import Task from "app/content/tasks/task/task";
import AddTasks from "app/content/tasks/addTasks/addTasks";
import ActiveTask from "app/content/tasks/activeTask/activeTask";
import "./tasks.scss";
import { ApiService } from "../../../service/api/apiService";
import { TasksStore } from "../../../redux/reducers/tasks/tasksSlice";
import { TaskDTO } from "../../../../../models/dtos/taskDTO";
import { useTypedDispatch, useTypedSelector } from "../../../redux/store";

const Tasks: FC = (): JSX.Element => {
    const userState = useTypedSelector(state => state.user);
    const { tasks } = useTypedSelector(state => state.tasks);
    const dispatch = useTypedDispatch();

    const { setTasks } = TasksStore.actions;

    useEffect(() => {
        ApiService.GetTasks(userState.user?.userId).then(tasks => {
            dispatch(setTasks(tasks));
        });
    }, [userState.user?.userId, dispatch]);

    return (
        <div className="tasks">
            <div className="tasks__left">
                <p>Tasks</p>
                {tasks?.map(elem => {
                    return (
                        <div key={elem.taskId}>
                            <Task text={elem.message} completed={elem.completed} />
                        </div>
                    );
                })}
                <button className="tasks__add-button">whatyougonnado?</button>
            </div>
            <div className="tasks__right">
                <ActiveTask />
            </div>
        </div>
    );
};

export default Tasks;
