import React, { useState, useEffect, useRef } from "react";


const useDate =() => {
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

    const [currentDate, setCurrentData] = useState({});
    const [futureDate, setFutureData] = useState({});

    useEffect(()=>{
    
        const newDate = new Date();
        const dayOfWeek = newDate.getDay();

        const minute = newDate.getMinutes();
        const hours = newDate.getHours();
        const day = newDate.getDate();
        const month = newDate.getMonth()+1;
        const year = newDate.getFullYear();

        setCurrentData({
            hours,
            minute,
            day,
            month,
            year
        });

    },[])

    const addMinutes = (add) => {
        let modifiAdd = add;
        let newCurrentDate = currentDate;

        //add minutes
        while(modifiAdd>0){
            if(modifiAdd>=60){
                newCurrentDate = {...newCurrentDate, minute:newCurrentDate.minute+60};
                modifiAdd=modifiAdd-60;
            }
            else{
                newCurrentDate = {...newCurrentDate, minute:newCurrentDate.minute+modifiAdd};
                modifiAdd=0;
            }
        }

        //add hours
        while(newCurrentDate.minute>=60){
            newCurrentDate = {...newCurrentDate, minute:newCurrentDate.minute-60, hours:newCurrentDate.hours+1};
        }

        //add days
        while(newCurrentDate.hours>=24){
            newCurrentDate = {...newCurrentDate, hours:newCurrentDate.hours-24, day:newCurrentDate.day+1};
        }

        //add months
        while(newCurrentDate.day>=chechDay(newCurrentDate.month, newCurrentDate.year)){
            newCurrentDate = {...newCurrentDate, day:newCurrentDate.day-chechDay(newCurrentDate.month, newCurrentDate.year), month:newCurrentDate.month+1};

            //add years
            if(newCurrentDate.month>12){
                newCurrentDate = {...newCurrentDate, month:1, year:newCurrentDate.year+1};
            }
        }
        return(newCurrentDate)
    }

    const dateCheck = (currentDate, checkedDate) =>{

        if(currentDate.year>checkedDate.year){
            return true;
        }
        else if(currentDate.month>checkedDate.month && currentDate.year===checkedDate.year){
            return true;
        }
        else if(currentDate.day>checkedDate.day && currentDate.month===checkedDate.month){
            return true;
        }
        else if(currentDate.hours>checkedDate.hours && currentDate.day===checkedDate.day){
            return true;
        }
        else if(currentDate.minute>=checkedDate.minute && currentDate.hours>=checkedDate.hours && currentDate.day>=checkedDate.day && currentDate.month>=checkedDate.month && currentDate.year>=checkedDate.year){
            return true;
        }
        else{
            return false}
    }
    


    return [currentDate, addMinutes, dateCheck];
}

export default useDate;

