import React from "react";
import style from "./DeckElement.module.css"
import {MdDone} from "react-icons/md"
export default function DeckElement(props){

    return(
        <>
            <div className={style.main}>
                <div className={style.top} style={{backgroundColor:props.color1}}>
                <div className={style.card2} style={{backgroundColor:props.color1}}></div>
                <div className={style.card3} style={{backgroundColor:props.color1}}></div>
                    <div className={style.title}>{props.title}</div>
                    <div className={style.allElement} style={{backgroundColor:props.color2}}>
                        <div className={style.numberOfElements}>{props.count}</div>
                    </div>
                </div>
                <div className={style.bottom} style={{border:`1px solid ${props.color1}`}}>
                        <div className={style.wordStudyElement} style={{backgroundColor:props.color2}}>{props.toStudy===0?<span>Odpoczynek</span>:<span>Do nauki</span>}</div>
                        <div className={style.toStudy}>{props.toStudy===0?<MdDone/>:<span>{props.toStudy}</span>}</div>
                </div>
            </div>
        </>
    )
}