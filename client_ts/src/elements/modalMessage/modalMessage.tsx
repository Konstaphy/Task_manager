// import React, { FC } from "react";
// import { useDispatch } from "react-redux";
// import { AuthActionTypes } from "redux/reducers/authTypes";
// import "./modalMessage.scss";
//
// interface PopUpMessageProps {
//     text: null | string;
//     error: boolean;
// }
//
// const ModalMessage: FC<PopUpMessageProps> = props => {
//     const dispatch = useDispatch();
//     const closeMsg = () => {
//         dispatch({ type: AuthActionTypes.setError, payload: null });
//     };
//     return (
//         <div className={"block"} style={{}} onClick={() => closeMsg()}>
//             <h4>{props.text}</h4>
//             <p>Click to close the message</p>
//         </div>
//     );
// };
//
export default "ModalMessage";
