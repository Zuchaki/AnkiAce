import { async } from "@firebase/util";
import React from "react";

//Oblicza rok przestępny
const chechDay = (month, year) => {
    switch(month){
        case 1:
            return 31;

        case 2:
            if (year%4 == 0 && year%100 != 0 || year%400 == 0){
                return 29;
            }
            else{
                return 28;
            }

        case 3:
            return 31;

        case 4:
            return 30;

        case 5:
            return 31;

        case 6:
            return 30;

        case 7:
            return 31;

        case 8:
            return 31;

        case 9:
            return 30;

        case 10:
            return 31;

        case 11:
            return 30;

        case 12:
            return 31;

    }
}

//Oblicza nam dzień miesiąca jeśli poniedziałek zachaczy o poprzedni miesiąc zamiast aktualnego
const existDay = (month, date, day, year) => {
    let newDayCount = 0;
    let theMonth = 0;

    if(date-day>0){
        return [date-day, month];
    }
    else{
        if(month===1){
            newDayCount = chechDay(12, year);
            theMonth=12;
        }
        else{
            newDayCount = chechDay(month-1, year);
            theMonth=month-1;
        }
        return [newDayCount-day+date, theMonth];
        
    }
} 
const useSevenDayWeek = () => {

    //Pobieramy date
    const newDate = new Date();
    const day = newDate.getDay();
    let date = newDate.getDate()+1;
    const month = newDate.getMonth()+1;
    const year = newDate.getFullYear();

    //Modyfikujemy datę tak aby można było na niej bazwoać
    //giveDate - dzień miesiąca jaki będzie w poniedziałek
    //giveMonth - Miesiąc jaki będzie w poniedzialek
    let [giveDate, giveMonth] = existDay(month, date, day, year);
    let plannedMonth = giveMonth;


    //Tu zapisujemy nasze obiekty z danymi odnośnie dnia
    const tab = [];

    //Past days
    for(let i=0; i<day-1; i++){
        if(chechDay(giveMonth, year)<giveDate){giveDate=1;plannedMonth++}
        tab.push({
            day:i+1,
            date:giveDate,
            future:false,
            theDay:false,
            planned:`${giveDate}.${plannedMonth}.${year}`
        })
        giveDate++;
    }

    //This day
    if(chechDay(giveMonth, year)<giveDate){giveDate=1;plannedMonth++}
    tab.push({
        day:day,//pon-nd
        date:giveDate,//1-31
        future:false,
        theDay:true,
        planned:`${giveDate}.${plannedMonth}.${year}`//xx.xx.xxxx
    })
    giveDate++;

    //Future days
    for(let i=day; i<=6; i++){
        if(chechDay(giveMonth, year)<giveDate){giveDate=1;plannedMonth++}
        tab.push({
            day:i+1,
            date:giveDate,
            future:true,
            theDay:false,
            planned:`${giveDate}.${plannedMonth}.${year}`
        })
        giveDate++;
    }
    
    return tab;
}

export default useSevenDayWeek;