import React from "react";
import Fast_ICON from "../../../Assets/Icons/Fast_ICON";
import style from "./IconsWithText.module.css";

export default function IconsWithText(props){

    return(
    <>
    <div className={style.container}>
        {props.icon}<div className={style.iconMargin}>{props.text}</div>
    </div>
    </>
    )
}