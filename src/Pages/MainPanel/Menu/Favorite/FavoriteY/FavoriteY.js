import React, {useState, useEffect} from "react";
import style from "./FavoriteY.module.css"
import DeckElement from "../../../DeckElement/DeckElement";
import useDecks from "../../../../../hooks/useDecks";
import { Link } from "react-router-dom";

export default function FavoriteY(){

    const [decks] = useDecks();
    const [favoriteDecks, setFavoriteDecks] = useState();
    useEffect(()=>{
        if(!decks){
            decks = [];
        }
        else{
            const newFavoriteDecks = [...decks].filter(e=>e.favorite === true)
            setFavoriteDecks(newFavoriteDecks)
        }
    },[decks])
    return(favoriteDecks?
        <>
        <div className={style.centerList}>
            <div className={style.deckContainer}>
                {favoriteDecks.map(value=>(
                    <Link className={style.link} style={{textDecoration:"none"}} to={`/profil/talia/${value.id}`} >
                        <DeckElement color1={value.color1} color2={value.color2} title={value.title} toStudy={value.toStudy} count={value.count}/>
                    </Link>
                )
                )}
            </div>
        </div>
        </>:<div>Ładowanie...</div>
    )
}