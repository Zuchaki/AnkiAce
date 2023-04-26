import React from "react";
import useSevenDayWeek from "../../../../hooks/useSevenDayWeek";
import style from "./Calendar.module.css"
import {Today, Past, Future} from "../../../../Components/Days/Days"
export default function Calendar(){

    const date = useSevenDayWeek();
    const dayName=["Pon", "Wt", "Śr", "Czw", "Pt", "So", "Nd"]
    return(

        //Pobieramy i wyświetlamy dni tygodnia z tego tygodnia
        <div className={style.coll}>
            <div className={style.main}>
                <div className={style.container}>
                    {date.map(day => (
                        day.future==false&&day.theDay==false?
                            (<div><Past day={day.date}/></div>): //Gdy jest to data przeszła
                        day.future==false&&day.theDay==true?
                            (<div><Today day={day.date}/></div>):  //Gdy jest to data dzisiejsza
                            (<div><Future day={day.date}/></div>) //Gdy jest to data przyszła
                    ))}
                </div>
            </div>



            {//Pobieramy i wyświetlamy nazwy dni tygodnia z tego tygodnia
}
            <div className={style.nameMain}>
                <div className={style.container}>
                    {dayName.map(e => (
                        <div className={style.singleName}>{e}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}