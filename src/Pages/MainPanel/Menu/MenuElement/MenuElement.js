import React from "react";
import style from "./MenuElement.module.css"

export default function MenuElement(props){

    return(
        <>
            <div className={style.container}>
                <div className={style.element}>{props.text}</div>
            </div>
        </>
    )
}