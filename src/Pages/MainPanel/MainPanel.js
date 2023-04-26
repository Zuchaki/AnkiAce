import React, { useEffect, useState } from "react";
import Menu from "./Menu/Menu";
import style from "./MainPanel.module.css"
import DeckElement from "./DeckElement/DeckElement";
import MyDecks from "./Content/MyDecks/MyDecks";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import authAxios from "../../AxiosInstance/axios-auth"
import useDate from "../../hooks/useDate";
import useSizeScreen from "../../hooks/useSizeScreen";
import {CgDetailsMore} from "react-icons/cg"
export default function MainPanel(){

    const [currentDate, addMinutes] = useDate();
    const [showMenu, setShowMenu] = useState(false);
    //const w = addMinutes(80)
    //console.log(`${w.hours}:${w.minute} ${w.day}.${w.month}.${w.year}`)

    //If is not auth then log out
    const [auth, setAuth] = useAuth();
    const [width, height] = useSizeScreen();

    const history = useNavigate()
    const singInChechk = async () => {
        try{
        const res = await authAxios.post("accounts:lookup",{
            idToken:auth.idToken
        })
        }
        catch(error){
            await localStorage.removeItem("AnkiAce");
            await history("/")
            window.location.reload(true);
        }
    }
    useEffect(()=>{
        singInChechk();
    },[])

    const [animationMenu, setAnimationMenu] = useState(0);
    const animationMenuHandler = () => {
        if(showMenu){
            setAnimationMenu(2)
            setTimeout(()=>{
                setShowMenu(false)
                setAnimationMenu(0)
            }, 500)
        }
        else{
            setShowMenu(true)
            setAnimationMenu(1)
            setTimeout(()=>{
                setAnimationMenu(0)
            }, 500)
        }
    }

    return(
        <>
        <div className={style.main}>
            <div className={style.container}>
                {width<1100?
                    <>
                        <div className={style.hiddenMenu}><CgDetailsMore size={38} className={style.moreIcon} onClick={() => animationMenuHandler()}/></div>
                        {showMenu?<div className={style.outOfElementMenuClick} onClick={() => animationMenuHandler()}></div>:<></>}
                    </>
                    :<></>}
                {showMenu | width>1100?
                    <div className={style.menuContainer}>
                        <Menu animationMenu={animationMenu} animationMenuHandler={animationMenuHandler}/>
                    </div>:<></>
                }

                <div className={style.contentContainer}>

                    <div className={style.deckBacgroundContainer}>
                    <div className={style.backgroundImg}></div>

                    <Outlet/>
                    </div>
                </div>
                
                


            </div>
        </div>
        </>
    )
}