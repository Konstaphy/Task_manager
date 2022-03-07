import React from "react";

interface AuthInputProps {
    title: string;
    setValue: (value: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const AuthInput: React.FC<AuthInputProps> = props => {
    return (
        <>
            <div className="auth-input__title">{props.title}</div>
            <input className="auth-input__input" type="text" onChange={props.setValue} value={props.value} />
        </>
    );
};

export default AuthInput;
