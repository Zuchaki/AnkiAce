import React, { useId, useState } from "react";
import style from "./LoginRight.module.css"
import GoogleIcon from "../../../../Assets/Icons/GoogleIcon";
import { Link, useNavigate } from "react-router-dom";
import GoogleSingIn from "../../../../AxiosInstance/GoogleLogin/googleSingIn";
import axios from "../../../../AxiosInstance/axios-auth"
import useAuth from "../../../../hooks/useAuth";
export default function LoginRight(){

    const eID = useId();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [auth, setAuth] = useAuth();
    const history = useNavigate();
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const passHandler = (e) => {
        setPass(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
            try{
                const res = await axios.post("accounts:signInWithPassword",{
                    email:email,
                    password:pass,
                    returnSecureToken: true
                })
                await setAuth({
                        email: res.data.email,
                        idToken:res.data.idToken,
                        localId:res.data.localId,
                        refreshToken:res.data.refreshToken
                    })
                history("/profil")
                
                }
                catch(error){
                    console.log(error)
                    window.location.reload(true);
                }
    }

    return(
        <>
            <form onSubmit={submit} className={style.main}>
                <h1>Zaloguj się</h1>

                <div className={style.part}>
                    <label>E-mail</label>
                    <input className={style.input} onChange={emailHandler} type="text" value={email}></input>
                </div>

                <div className={style.part}>
                    <label>Hasło</label>
                    <input className={style.input} type="password" onChange={passHandler} value={pass}/>
                </div>
                <button className={style.button} onClick={submit}>Zaloguj się</button>

                <Link to="/register" className={style.forgetPass}>Załóż konto</Link>
                <div className={style.google}><GoogleSingIn /></div>
                <div className={style.hello}>Cześć! Miło Cię widzieć!</div>
            </form>

        </>
    )
}