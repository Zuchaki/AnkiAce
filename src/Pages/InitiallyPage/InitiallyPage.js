import React from "react";
import Effective_ICON from "../../Assets/Icons/Effective_ICON";
import Fast_ICON from "../../Assets/Icons/Fast_ICON";
import Free_ICON from "../../Assets/Icons/Free_ICON";
import GoogleIcon from "../../Assets/Icons/GoogleIcon";
import IconsWithText from "./IconsWithText/IconsWithText";
import style from "./InitiallyPage.module.css"
import {Link} from 'react-router-dom';
import useSizeScreen from "../../hooks/useSizeScreen";

export default function InitiallyPage(){

    const [width, height] = useSizeScreen();

    return(
        <>
        <div>
            <div className={style.main}>
                <div className={style.initiallyText}>
                    <h1 className={style.initiallyTextSpans}>
                        <div className={style.row}>
                            <span className={style.AnkiWord}>AnkiAce</span>
                            {width>1100?
                            <>
                                <span className={style.UczsieWord}>Ucz</span>
                                <span className={style.UczsieWord}>Się</span>
                            </>
                            :
                            <>
                                <span className={style.UczsieWord}>Ucz się</span>
                            </>
                            }
                        </div>
                        <span>Efektywniej </span>
                    </h1>
                </div>
                <div className={style.rowAtuts}>
                    <IconsWithText icon={<Fast_ICON/>} text={"Kilka minut dziennie"}/>
                    <IconsWithText icon={<Effective_ICON/>} text={"Całkowicie darmowe"}/>
                    <IconsWithText icon={<Free_ICON/>} text={"Bardzo efektywne"}/>
                </div>

                <div className={style.description}>
                        W pełni darmowa aplikacja anki do ekeftywnej nauki bez marnowania nadmiernej ilości czasu.
                        Zwiększ swoją wydajność, bądz o krok przed innymi, limity są dla innych nie dla Ciebie.
                        Twój mózg jest w stanie więje niż Ci się wydaje, nie zmarnuj tego potęcjału
                </div>
                <div className={style.buttonsContainer}>
                    <Link to="/login" className={style.button}><span className={style.buttonSpan}>Zaloguj się</span></Link>
                    <Link to="/register"className={style.button}><span className={style.buttonSpan}>Zarejestruj</span></Link>
                </div>
                
            </div>
        </div>
        </>
    );
}