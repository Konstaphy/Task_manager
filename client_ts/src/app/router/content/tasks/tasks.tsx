import React, { FC, useEffect } from "react";
import Task from "app/router/content/tasks/task/task";
import ActiveTask from "app/router/content/tasks/activeTask/activeTask";
import "./tasks.scss";
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store";
import { getTasks } from "../../../../redux/actionCreators/tasks/getAllTasks";
import { TasksStore } from "../../../../redux/reducers/tasks/tasksSlice";

const Tasks: FC = (): JSX.Element => {
    const userState = useTypedSelector(state => state.user);
    const { tasks } = useTypedSelector(state => state.tasks);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (!userState.user?.userId) {
            return;
        }
        dispatch(getTasks(userState.user?.userId));
    }, []);

    const setAdding = () => {
        dispatch(TasksStore.actions.setCurrent(undefined));
    };

    return (
        <div className="tasks">
            <div className="tasks__left">
                <p>Tasks</p>
                {tasks?.map(elem => {
                    return <Task task={elem} key={elem.taskId} />;
                })}
                <button className="tasks__add-button" onClick={setAdding}>
                    whatyougonnado?
                </button>
            </div>
            <div className="tasks__right">
                <ActiveTask />
            </div>
        </div>
    );
};

export default Tasks;
