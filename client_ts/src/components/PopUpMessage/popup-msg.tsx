import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { authActionTypes } from "../../Redux/reducers/authTypes";
import "./popUpMessage.css";

interface PopUpMessageProps {
    text: null | string;
    error: boolean;
}

const PopupMsg: FC<PopUpMessageProps> = props => {
    const dispatch = useDispatch();
    const closeMsg = () => {
        dispatch({ type: authActionTypes.setError, payload: null });
    };
    return (
        <div className={"block"} style={{}} onClick={() => closeMsg()}>
            <h4>{props.text}</h4>
            <p>Click to close the message</p>
        </div>
    );
};

export default PopupMsg;
