import React, {useEffect} from "react";
import style from "./Login.module.css"
import LoginRight from "./LoginRight/LoginRight";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../AxiosInstance/axios-auth"

export default function Login(){

    const history = useNavigate()
    const [auth, setAuth] = useAuth();

    const singInChechk = async () => {
        try{
        const res = await axios.post("accounts:lookup",{
            idToken:auth.idToken
        })
        if(res.status===200){
            await history("/profil")
            window.location.reload(true);
        }
        }
        catch(error){
            localStorage.removeItem("AnkiAce");
        }
    }
    useEffect(()=>{
        singInChechk();
    },[])

    return(
        <>
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.right}>
                        <LoginRight/>
                    </div>
                </div>
            </div>
        </>
    )
}