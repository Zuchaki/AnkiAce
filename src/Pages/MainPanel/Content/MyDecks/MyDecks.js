import React, { useEffect, useState } from "react";
import style from "./MyDecks.module.css"
import DeckElement from "../../DeckElement/DeckElement";
import { Link } from "react-router-dom";
import NewDeckButton from "../../NewDeckButton/NewDeckButton";
import axios_decks from "../../../../AxiosInstance/axios-decks";
import useAuth from "../../../../hooks/useAuth";
import useDecks from "../../../../hooks/useDecks";

export default function MyDecks(){

    const [dbDecks, setDbDecks] = useState();
    const [auth] = useAuth();
    const [decks] = useDecks();

    
    const getDecks = () => {
        if(!decks){
            setDbDecks([]);
        }
        else{
            setDbDecks(decks);
        }
    }

    useEffect(() => {
        if(auth){
            getDecks();
        }
    }, [decks])

    return(
    <>
    {dbDecks?
        <>
            <div className={style.titleContainer}>
                <div className={style.title}>Moje wszystkie talie</div>
            </div>
            
            <div className={style.myDecks}>
                {          
                    dbDecks.map(value =>(
                        <Link style={{textDecoration:"none"}} to={`/profil/talia/${value.id}`} >
                            <div className={style.deckContainer}>         
                                    <DeckElement color1={value.color1} color2={value.color2} title={value.title} toStudy={value.toStudy} count={value.count}/>
                            </div>
                        </Link>
                    ))
                }
                    <div className={style.deckContainer}>
                        <Link style={{textDecoration:"none"}} to={'/profil/nowatalia'} ><NewDeckButton/></Link>
                    </div>
            </div>
        </>
        :
        <div>Ładowanie...</div>
    }
    </>
    )
}