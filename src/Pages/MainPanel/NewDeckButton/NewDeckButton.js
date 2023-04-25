import React from "react"
import style from "./NewDeckButton.module.css"
import Add_ICON from "../../../Assets/Icons/Add_ICON"
import useSizeScreen from "../../../hooks/useSizeScreen"

const NewDeckButton = (props) => {

    const [width,height] = useSizeScreen();

    return(
        <>
            <div className={style.newDeck}>
                <div className={style.newDeckCircleAdd}>
                    <div className={style.newDeckPlus}><Add_ICON/></div>
                </div>
                <div className={style.newDeckText}>Dodaj nową talię</div>
            </div>
        </>
    )
}

export default NewDeckButton;