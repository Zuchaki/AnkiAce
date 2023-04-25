import React, { useState, useEffect } from "react";
import style from "./FavoriteX.module.css"
import DeckElement from "../../../DeckElement/DeckElement";
import { Arrow_back_ICON, Arrow_next_ICON } from "../../../../../Assets/Icons/Arrows_ICON";
import { Link } from "react-router-dom";
import useDecks from "../../../../../hooks/useDecks";

export default function FavoriteX(){

    const [decks] = useDecks();
    const [favoriteDecks, setFavoriteDecks] = useState();

    const [runNext, setRunNext] = useState(false)
    const [runBack, setRunBack] = useState(false)
    const [curr, setCurr] = useState(0)
    const [currNext, setCurrNext] = useState(1)
    const [currPrevious, setCurrPrevious] = useState(favoriteDecks?favoriteDecks.length-1:6)


    useEffect(()=>{
        if(!decks){
            decks = [];
        }
        else{
            const newFavoriteDecks = [...decks].filter(e=>e.favorite === true)
            setCurrPrevious(newFavoriteDecks.length-1)
            setFavoriteDecks(newFavoriteDecks)
        }
    },[decks])
  

    const nextHandler = () => {
        setRunNext(true)
        setTimeout(()=>{
            setRunNext(false);
            if(curr+1===favoriteDecks.length){
                setCurrPrevious(favoriteDecks.length-1)
                setCurr(0);
                setCurrNext(1);
                console.log("wykonano 1")
            }
            else if(currNext+1===favoriteDecks.length){
                setCurrPrevious(currNext-1)
                setCurr(currNext);
                setCurrNext(0)
                console.log("wykonano 2")
            }
            else if(currNext+1<favoriteDecks.length){
                setCurrPrevious(currNext-1)
                setCurr(currNext);
                setCurrNext(currNext+1)
                console.log("wykonano 3")
            }
        },500)

        
    }


    const backHandler = () => {
        setRunBack(true)
        setTimeout(()=>{
            setRunBack(false);
            if(curr-1===0){
                setCurrPrevious(favoriteDecks.length-1)
                setCurr(0);
                setCurrNext(1);
                console.log("wykonano 1")
            }
            else if(currPrevious-1===0){
                setCurrPrevious(0)
                setCurr(currPrevious);
                setCurrNext(curr)
                console.log("wykonano 2")
            }
            else if(currPrevious-1>0){
                setCurrPrevious(currPrevious-1)
                setCurr(currPrevious);
                setCurrNext(curr)
                console.log("wykonano 3")
            }
        },500)
        
    }
    const nextString = ">";
    const backString = "<";
    return(
        <>
        {favoriteDecks?
        favoriteDecks.length>1?<>{console.log(favoriteDecks[curr].id)}
        <div className={runNext?style.containerScrollXNextName:(runBack?style.containerScrollXBackName:style.containerScrollXNoName)}>
            <div className={style.row}>
            <div className={style.centerList}>
                <div className={style.deckContainer}>
                    <DeckElement color1={favoriteDecks[currPrevious].color1} color2={favoriteDecks[currPrevious].color2} title={favoriteDecks[currPrevious].title} toStudy={favoriteDecks[currPrevious].toStudy} count={favoriteDecks[currPrevious].count}/>
                </div>
            </div>
            <Link style={{textDecoration:"none"}} to={`/profil/talia/${favoriteDecks[curr].id}`} >
            <div className={style.centerList}>
                <div className={style.deckContainer}>
                    <DeckElement color1={favoriteDecks[curr].color1} color2={favoriteDecks[curr].color2} title={favoriteDecks[curr].title} toStudy={favoriteDecks[curr].toStudy} count={favoriteDecks[curr].count}/>
                </div>
            </div>
            </Link>
            <div className={style.centerList}>
                <div className={style.deckContainer}>
                    <DeckElement color1={favoriteDecks[currNext].color1} color2={favoriteDecks[currNext].color2} title={favoriteDecks[currNext].title} toStudy={favoriteDecks[currNext].toStudy} count={favoriteDecks[currNext].count}/>
                </div>
            </div>
            </div>
        </div>

        <div className={style.buttonContainer}>
            <button className={style.button} onClick={() => backHandler()}><Arrow_back_ICON/></button>
            <button className={style.button} onClick={() => nextHandler()}><Arrow_next_ICON/></button>
        </div>
        </>:
        <>
        <Link style={{textDecoration:"none"}} to={`/profil/talia/${favoriteDecks[curr].id}`} >
            <DeckElement color1={favoriteDecks[0].color1} color2={favoriteDecks[0].color2} title={favoriteDecks[0].title} toStudy={favoriteDecks[0].toStudy} count={favoriteDecks[0].count}/>
        </Link>
        </>
        :<></>}
        </>
    )
}