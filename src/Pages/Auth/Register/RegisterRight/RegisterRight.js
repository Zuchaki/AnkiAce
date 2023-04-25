import React, { useId, useState } from "react";
import style from "./RegisterRight.module.css"
import GoogleIcon from "../../../../Assets/Icons/GoogleIcon";
import { Link, useNavigate } from "react-router-dom";
import usePassHash from "../../../../hooks/usePassHash";
import { validEmail, validPassword } from "../../../../hooks/useValid";
import { ElementFlags } from "typescript";
import axios from "../../../../AxiosInstance/axios-auth"
import { useDispatch } from "react-redux";
import useAuth from "../../../../hooks/useAuth";
import useSizeScreen from "../../../../hooks/useSizeScreen";
import GoogleSingIn from "../../../../AxiosInstance/GoogleLogin/googleSingIn";

export default function RegisterRight(){

    const history = useNavigate();
    const eID = useId();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [repPass, setRepPass] = useState("")
    const [stat, setStat] = useState(false)
    const [valid, setValid] = useState({
        pass:null,
        repPass:null,
        email:null
    })
    const [hashPass] = usePassHash(pass);
    const [auth, setAuth] = useAuth();
    const [width, height] = useSizeScreen();
    const [emailBusy, setEmailBusy] = useState(false);

    //Valid E-mail
    const emailHandler = (e) => {

        setEmail(e.target.value);
        if(e.target.value===""){
            setValid({...valid, email:null})
        }
        else if(validEmail(e.target.value)){
            setValid({...valid, email:true})
        }
        else{
            setValid({...valid, email:false})
        }
    }

    //Valid password
    const passHandler = (e) => {
        setPass(e.target.value);
        if(e.target.value===""){
            setValid({...valid, pass:null})
        }
        else if(validPassword(e.target.value)){
            setValid({...valid, pass:true})
        }
        else{
            setValid({...valid, pass:false})
        }
    }

    //Valid RepPassword
    const repPassHandler = (e) => {
        setRepPass(e.target.value)
        if(e.target.value===""){
            setValid({...valid, repPass:null})
        }
        else if(pass===e.target.value){
            setValid({...valid, repPass:true})
        }
        else{
            setValid({...valid, repPass:false})
        }
    }

    const statusHandler = (e) => {
            setStat(e.target.checked)
    }

    //Login
    const submit = async (e) => {
        e.preventDefault();
        if(valid.email&&valid.pass&&valid.repPass&&stat){
            try{
            const res = await axios.post("accounts:signUp",{
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
            history('/profil');
            }
            catch(error){
                console.log(error)
                if(error.response.status===400){
                    setEmailBusy(true);
                }
            }
        }
        else{
            e.preventDefault();
        }      
    }

    return(
        <>
            <div className={style.main}>
                <form onSubmit={submit} className={style.submit}>
                    <h1>Zarejestruj się</h1>

                    <div className={style.part}>
                        <label>E-mail</label>
                        <input className={style.input} onChange={emailHandler} type="text" value={email}/>
                        {valid.email===null?<></>:
                         valid.email?
                            <div className={style.valid}>E-mail poprawny</div>:
                            <div className={style.invalid}>Nieprawidłowy e-mail</div>
                        }
                    </div>

                    <div className={style.part}>
                        <label>Hasło</label>
                        <input className={style.input} type="password" onChange={passHandler} value={pass}/>
                        {valid.pass===null?<></>:
                         valid.pass?
                            <div className={style.valid}>Hasło poprawne</div>:
                            <div className={style.invalid}>
                                <ol>
                                    <li>Hasło misi być dłuższe niż 8 znaków</li>
                                    <li>Hasło musi zawierać conajmniej jedną dużą i małą literę</li>
                                    <li>Hasło musi zawierać conajmniej jedną cyfrę</li>
                                    <li>Hasło musi zawierać conajmniej jeden znak specialny</li>
                                </ol>
                            </div>
                        }
                    </div>

                    <div className={style.part}>
                        <label>Powtórz hasło</label>
                        <input className={style.input} type="password" onChange={repPassHandler} value={repPass}/>
                        {valid.repPass===null?<></>:
                         valid.repPass?
                            <div className={style.valid}>Hasła są takie same</div>:
                            <div className={style.invalid}>Hasła nie są takie same</div>
                        }
                    </div>

                    <div className={style.statute}>
                        <label htmlFor={eID}>Przeczytałem i akceptuje regulamin</label>
                        <input type="checkbox" id={eID} className={style.checkbox} onChange={statusHandler}/>
                    </div>
                    {emailBusy?<div className={style.invalid}>Email zajęty</div>:<></>}

                    {valid.email&valid.pass&valid.repPass&stat?
                        <button className={style.button}>Zarejestruj</button>:<div className={style.buttonDisable}>Podaj dane</div>
                    }
                    {width<1100?<div className={style.google}><GoogleSingIn/></div>:<></>}
                </form>
                <Link to="/login" className={style.forgetPass}>Mam już konto</Link>
                
            </div>

        </>
    )
}