import React, { useId, useState } from "react";
import style from "./RegisterLeft.module.css"
import GoogleIcon from "../../../../Assets/Icons/GoogleIcon";
import Fast_ICON from "../../../../Assets/Icons/Fast_ICON";
import Effective_ICON from "../../../../Assets/Icons/Effective_ICON";
import Free_ICON from "../../../../Assets/Icons/Free_ICON";
import IconsWithText from "../../../InitiallyPage/IconsWithText/IconsWithText";
import GoogleSingIn from "../../../../AxiosInstance/GoogleLogin/googleSingIn";

export default function RegisterLeft(){

    const eID = useId();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const passHandler = (e) => {
        setPass(e.target.value);
    }
    
    return(
        <>
            <div className={style.main}>

            <div className={style.top}>
                <span className={style.AnkiWord}>AnkiAce</span>
                <div className={style.hello}>Cześć! Miło Cię widzieć!</div>
                <div className={style.collAtuts}>
                    <div className={style.IElement}><IconsWithText icon={<Fast_ICON/>} text={"Kilka minut dziennie"}/></div>
                    <div className={style.IElement}><IconsWithText className={style.IElement} icon={<Effective_ICON/>} text={"Całkowicie darmowe"}/></div>
                    <div className={style.IElement}><IconsWithText className={style.IElement} icon={<Free_ICON/>} text={"Bardzo efektywne"}/></div>
                </div>
            </div>

            <div className={style.bottom}>
            <div className={style.hello}>Najlepszy sposób na efektywną naukę wykorzystując fiszki!</div>
            <GoogleSingIn/>
            </div>
            </div>

        </>
    )
}