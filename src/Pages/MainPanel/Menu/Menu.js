import React, { useEffect } from "react";
import Logout_ICON from "../../../Assets/Icons/Logout_ICON";
import sevenDayWeek from "../../../hooks/useSevenDayWeek";
import Calendar from "./Calendar/Calendar";
import MenuElement from "./MenuElement/MenuElement";
import style from "./Menu.module.css"
import FavoriteY from "./Favorite/FavoriteY/FavoriteY";
import NewDeck from "../NewDeckButton/NewDeckButton";
import FavoriteX from "./Favorite/FavoriteX/FavoriteX";
import useSizeScreen from "../../../hooks/useSizeScreen";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


export default function Menu(){

    const TEMP = [["#6d56e5", "#a291f1"], ["#ed601b","#ed9563"], ["#d9184d","#e5678c"], ["#1f63c4","#689ddf"], ["#257580","#69a0a7"]]
    const [width, height] = useSizeScreen();
    const [auth] = useAuth();
    const history = useNavigate();

    useEffect(()=>{
        sevenDayWeek();
    },[])

    const singOutHandler = async () => {
        await localStorage.removeItem("AnkiAce");
        await history("/")
        window.location.reload(true);
    }

    return(
        <>
                    <div className={style.menuContainer}>
                        <div className={style.menuImg}></div>
                        <div className={style.menu}>

                            <div className={style.nameContainer}>
                                {width<1100?<></>:<div className={style.hello}>Cześć!<div className={style.hand}></div></div>}
                                <div className={style.name}>{auth?auth.email:<></>}</div>
                            </div>


                            <Calendar/>
                            <Link className="disableUnderline" to={'/profil'} ><MenuElement text={`Moje talie`}/></Link>
                            {//<Link className="disableUnderline" to={'/profil/talia'}><MenuElement text={"Mój Profil"}/></Link>
                            //<MenuElement text={"Sklep"}/>
                            }


                            <div className={style.connect}>
                                <div className={style.center}>
                                    <div className={style.deckTitleContainer}><div className={style.decksTitle}>Ulubione</div></div>
                                </div>
                                
                                {width>500?
                                <FavoriteY/>:<FavoriteX/>
                                }
                            </div>

                            <div className={style.logoutContainer} onClick={singOutHandler}>
                                <div className={style.logout}>
                                    Wyloguj<div className={style.ICONMargin}><Logout_ICON/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.content}>
                    
                    </div>
        </>
    )
}