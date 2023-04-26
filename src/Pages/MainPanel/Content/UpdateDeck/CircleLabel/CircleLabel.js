import React from "react";
import style from "./CircleLabel.module.css"

export default function CircleLabel(props){

    return(
        <>
        <label>
            <input
                type="radio"
                value={props.value}
                style={{backgroundColor:props.color1}}
                checked={props.selectedValue === props.value}
                onChange={(e) => props.onChange(e, props.color1, props.color2)}
                className={style.radio}
            />
        </label>
        </>
    )
}