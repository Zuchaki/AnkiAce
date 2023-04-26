import React from "react";
import style from "./Days.module.css"

function Future(props){
    return(
        <>
            <div className={style.containerFuture}>
                <div className={style.number}>{props.day}</div>
            </div>
        </>
    )
}

function Past(props){
    return(
        <>
            <div className={style.containerPast}>
                <div className={style.number}>{props.day}</div>
            </div>
        </>
    )
}

function Today(props){
    return(
        <>
            <div className={style.containerToday}>
                <div className={style.number}>{props.day}</div>
            </div>
        </>
    )
}

export {Today, Past, Future}