import React, { FC } from "react";
import "./modalMessage.scss";

interface PopUpMessageProps {
    text: null | string;
    isOpen: boolean;
    toggleOpen: () => void;
}

const ModalMessage: FC<PopUpMessageProps> = props => {
    const closeMsg = () => {
        props.toggleOpen();
    };
    if (!props.isOpen) return <></>;
    return (
        <div className="modalMessage" onClick={() => closeMsg()}>
            <h4>{props.text}</h4>
            <p>Click to close the message</p>
        </div>
    );
};

export default ModalMessage;
