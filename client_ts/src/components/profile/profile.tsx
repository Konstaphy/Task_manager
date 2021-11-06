import React from 'react';
import {useTypedSelector} from "../../hooks/hooks";
import axiosInstance from "../../server";
import {useDispatch} from "react-redux";
import {authActionTypes} from "../../Redux/reducers/authTypes";
import {useHistory} from "react-router-dom";

const Profile = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const signOut = () => {
        axiosInstance.post('/api/logout').then(() => {
            dispatch({type: authActionTypes.setLoggedOut})
        }).then(() => {
            if (!state.logged)
                history.push('/profile')
        })
    }

    return (
        <div>
            <h1>{state.username}</h1>
            <form>
                <input type="file" name="avatar"/>
                <input type="submit"/>
            </form>
            <h3>{state.email}<br/>{state.user_id}</h3>
            <button type='button' onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default Profile;