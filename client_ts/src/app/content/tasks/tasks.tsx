// import React, { FC, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useTypedSelector } from "hooks/hooks";
// import axiosInstance from "server";
// import { tasksActionTypes, task } from "redux/reducers/tasksTypes";
// import Task from "app/content/tasks/task/task";
// import AddTasks from "app/content/tasks/addTasks/addTasks";
// import ActiveTask from "app/content/tasks/activeTask/activeTask";
// import "app/tasksscss";
//
// const Tasks: FC = (): JSX.Element => {
//     const state = useTypedSelector(state => state);
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         axiosInstance.get(`/api/tasks/${state.auth.userId}`).then(r => {
//             dispatch({ type: tasksActionTypes.setTasks, payload: r.data });
//         });
//     }, [state.auth.userId, dispatch]);
//
//     const setActive = (task: task) => {
//         dispatch({ type: tasksActionTypes.setTaskToActive, payload: task });
//     };
//
//     const setAdding = () => {
//         dispatch({ type: tasksActionTypes.toggleType });
//     };
//
//     return (
//         <div className={"tasks"}>
//             <div className={"tasks__left"}>
//                 <p>Tasks</p>
//                 {state.tasks.tasks.map(elem => {
//                     return (
//                         <div onClick={() => setActive(elem)} key={elem.task_id}>
//                             <Task text={elem.message} completed={elem.completed} />
//                         </div>
//                     );
//                 })}
//                 <button className={"tasks__add-button"} onClick={setAdding}>
//                     whatyougonnado?
//                 </button>
//             </div>
//             <div className={"tasks__right"}>{state.tasks.type === "ADDING" ? <AddTasks /> : <ActiveTask />}</div>
//         </div>
//     );
// };
//
export default "Tasks";
