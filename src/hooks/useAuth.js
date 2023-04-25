import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
    const reduxUser = JSON.parse(useSelector(state => state.auth.user));
    const dispatch = useDispatch();

    const setAuth = (takenUser) => {
        
        dispatch({type:'SingIn', user:{
            email:takenUser.email,
            idToken:takenUser.idToken,
            localId:takenUser.localId,
            refreshToken:takenUser.refreshToken
        }})
    }



    return[reduxUser,setAuth]
}

export default useAuth;