import React from "react";
import "./authInput.scss";

interface AuthInputProps {
    title: string;
    setValue: (value: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const AuthInput: React.FC<AuthInputProps> = props => {
    return (
        <div className="auth-input">
            <div className="auth-input__title">{props.title}</div>
            <input className="auth-input__input" type={props.title} onChange={props.setValue} value={props.value} />
        </div>
    );
};

export default AuthInput;
