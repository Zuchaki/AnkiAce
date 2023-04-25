import React, {useState, useEffect} from "react";
import style from "./StudyPanel.module.css"
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import axios_decks from "../../../../AxiosInstance/axios-decks"
import useDate from "../../../../hooks/useDate";

export default function(){

    const lvlRead = (lvl) => {
        switch(lvl){
            case 1:
                return{
                    medium:5,
                    mediumLVL:2,
                    mediumNext:"5 min",
                    good:15,
                    goodLVL:2,
                    goodNext:"15 min",
                }
            case 2:
                return{
                    medium:15,
                    mediumLVL:3,
                    mediumNext:"15 min",
                    good:60,
                    goodLVL:3,
                    goodNext:"1 godź",
                }
            case 3:
                return{
                    medium:60,
                    mediumLVL:4,
                    mediumNext:"1 godź",
                    good:1440,
                    goodLVL:4,
                    goodNext:"1 dzień",
                }
            case 4:
                return{
                    medium:1440,
                    mediumLVL:5,
                    mediumNext:"1 dzień",
                    good:4320,
                    goodLVL:5,
                    goodNext:"3 dni",
                }
            case 5:
                return{
                    medium:4320,
                    mediumLVL:6,
                    mediumNext:"3 dni",
                    good:10080,
                    goodLVL:6,
                    goodNext:"1 tydź",
                }
            case 6:
                return{
                    medium:10080,
                    mediumLVL:7,
                    mediumNext:"1 tydź",
                    good:20160,
                    goodLVL:7,
                    goodNext:"2 tyg",
                }
            case 7:
                return{
                    medium:1440,
                    mediumLVL:5,
                    mediumNext:"1 dzień",
                    good:43200,
                    goodLVL:8,
                    goodNext:"1 mies",
                }
            case 8:
                return{
                    medium:1440,
                    mediumLVL:5,
                    mediumNext:"1 dzień",
                    good:86400,
                    goodLVL:9,
                    goodNext:"2 mies",
                }
            case 9:
                return{
                    medium:4320,
                    mediumLVL:6,
                    mediumNext:"3 dni",
                    good:10,
                    goodLVL:1,
                    goodNext:"1 rok",
                }
        }
    }
    const params = useParams();
    const [auth] = useAuth();
    const [deckInfo, setDeckInfo] = useState();
    const history = useNavigate();
    const [Qanswer, setQAnswer] = useState(false);
    const [fleshCards, setFleshCards] = useState()
    const [date, addDate, checkDate] = useDate();
    const [newFlashDate, setNewFlashDate] = useState();
    const [fleshCardIndex, setFleshCardIndex] = useState(0);
    const [animation, setAnimation] = useState(0)
    const loadData = async () => {
        try{   
            const res = await axios_decks.get(`decks/${params.deckId}.json`)
            await setDeckInfo({
                color1:res.data.color1,
                color2:res.data.color2,
                title:res.data.title,
                toStudy: 5,
                count: 12,
                favorite: res.data.favorite
            })
            if(res.data.localId!==auth.localId){
                history("/Profil");
            }

        }   
        catch(error){
            console.log(error)
        }
    }
    const loadFleshCards = async () => {
        try{
            let newFleshCards = []   
            const config = {
                params: {
                  orderBy: '"deckId"',
                  equalTo: `"${params.deckId}"`
                },
              };              
      
            const res = await axios_decks.get(`fleshCards.json`, config)
            for (const key in res.data) {
                const e = res.data[key];
                //Jeśli data jest przeszła
                if(checkDate(date,{year:e.year,
                        month:e.month,
                        day:e.day,
                        hours:e.hours,
                        minute:e.minute}))
                    {
                        //push do tabeli
                        await newFleshCards.push({
                            front: e.front,
                            back: e.back,
                            year:e.year,
                            month:e.month,
                            day: e.day,
                            hours:e.hours,
                            minute:e.minute,
                            deckId: e.deckId,
                            localId:e.localId,
                            lvl:e.lvl,
                            id:key
                        })
                    }
                }
                if(newFleshCards.length===0){
                    history(`../../profil/talia/${params.deckId}`)
                }
                else{
                    await setFleshCards(newFleshCards);
                }
                console.log(fleshCards);
            }  
            catch(error){
                console.log(error)
            }       
    }

    const addLow = async () => {
        try{
            const res = await axios_decks.get(`decks/${params.deckId}.json`)
            if(res.data.localId===auth.localId){
            //put favorite
            try{
                const res = await axios_decks.put(`fleshCards/${fleshCards[fleshCardIndex].id}.json?auth=${auth.idToken}`,{
                    front: fleshCards[fleshCardIndex].front,
                    back: fleshCards[fleshCardIndex].back,
                    year:addDate(1).year,
                    month:addDate(1).month,
                    day: addDate(1).day,
                    hours:addDate(1).hours,
                    minute:addDate(1).minute,
                    deckId: fleshCards[fleshCardIndex].deckId,
                    localId:fleshCards[fleshCardIndex].localId,
                    lvl:1,
                    id:fleshCards[fleshCardIndex].id
                })
                await console.log(res)
                if(fleshCards.length<=fleshCardIndex+1){
                    history("/Profil");
                }
                else{
                    await setAnimation(1)
                    await setTimeout(async()=>{
                        await setFleshCardIndex(await fleshCardIndex+1)
                        await setQAnswer(false)
                        await setAnimation(0)
                    },600)
                }
            }
            catch(error){
                console.log(error)
            }
            }
        }
        //error put
        catch(error){
            console.log(error)
        }
    }
    

    const addMedium = async () => {
        try{
            const res = await axios_decks.get(`decks/${params.deckId}.json`)
            if(res.data.localId===auth.localId){
            //put favorite
            try{
                let newFlashD = await lvlRead(fleshCards[fleshCardIndex].lvl)
                newFlashD = await newFlashD.medium
                const res = await axios_decks.put(`fleshCards/${fleshCards[fleshCardIndex].id}.json?auth=${auth.idToken}`,{
                    front: fleshCards[fleshCardIndex].front,
                    back: fleshCards[fleshCardIndex].back,
                    year:addDate(newFlashD).year,
                    month:addDate(newFlashD).month,
                    day: addDate(newFlashD).day,
                    hours:addDate(newFlashD).hours,
                    minute:addDate(newFlashD).minute,
                    deckId: fleshCards[fleshCardIndex].deckId,
                    localId:fleshCards[fleshCardIndex].localId,
                    lvl:lvlRead(fleshCards[fleshCardIndex].lvl).mediumLVL,
                    id:fleshCards[fleshCardIndex].id
                })
                await console.log(res)
                if(fleshCards.length<=fleshCardIndex+1){
                    history("/Profil");
                }
                else{
                    await setAnimation(1)
                    await setTimeout(async()=>{
                        await setFleshCardIndex(await fleshCardIndex+1)
                        await setQAnswer(false)
                        await setAnimation(0)
                    },600)
                }
            }
            catch(error){
                console.log(error)
            }
            }
        }
        //error put
        catch(error){
            console.log(error)
        }
    }

    
    const addGood = async () => {
        try{
            const res = await axios_decks.get(`decks/${params.deckId}.json`)
            if(res.data.localId===auth.localId){
            //put favorite
            try{
                let newFlashD = await lvlRead(fleshCards[fleshCardIndex].lvl)
                newFlashD = await newFlashD.good
                const res = await axios_decks.put(`fleshCards/${fleshCards[fleshCardIndex].id}.json?auth=${auth.idToken}`,{
                    front: fleshCards[fleshCardIndex].front,
                    back: fleshCards[fleshCardIndex].back,
                    year:addDate(newFlashD).year,
                    month:addDate(newFlashD).month,
                    day: addDate(newFlashD).day,
                    hours:addDate(newFlashD).hours,
                    minute:addDate(newFlashD).minute,
                    deckId: fleshCards[fleshCardIndex].deckId,
                    localId:fleshCards[fleshCardIndex].localId,
                    lvl:lvlRead(fleshCards[fleshCardIndex].lvl).goodLVL,
                    id:fleshCards[fleshCardIndex].id
                })
                await console.log(res)
                if(fleshCards.length<=fleshCardIndex+1){
                    history("/Profil");
                }
                else{
                    await setAnimation(1)
                    await setTimeout(async()=>{
                        await setFleshCardIndex(await fleshCardIndex+1)
                        await setQAnswer(false)
                        await setAnimation(0)
                    },600)

                }
            }
            catch(error){
                console.log(error)
            }
            }
        }
        //error put
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(!(Object.keys(date).length === 0))
        loadData();

        if(!(Object.keys(date).length === 0)){loadFleshCards()};
    }, [date])
    


    return(
        <>
        {deckInfo?fleshCards?<>
            <div className={style.main}>
                <div className={style.title} style={{backgroundColor:deckInfo.color1}}>{deckInfo.title}</div>
                <div className={style.containerTop}>
                    <div className={animation===0?style.animation:animation===1?style.outAnimation:style.noAnimation}>
                        <div className={style.Qsentense}>
                            <div dangerouslySetInnerHTML={{ __html:fleshCards[fleshCardIndex].front}}/>
                        </div>
                        {!Qanswer?
                        <div className={style.Qbutton} style={{backgroundColor:deckInfo.color1}} onClick={()=>setQAnswer(true)}>Sprawdz</div>
                        :
                        <div className={style.Qsentense}>
                            <div dangerouslySetInnerHTML={{ __html:fleshCards[fleshCardIndex].back}}/>
                        </div>}
                    </div>
                </div>
                <div className={style.containerBottom}>
                    <div className={style.buttonsContainer}>
                        <div className={style.markContainer} onClick={addLow}>
                            <div className={style.mark} style={{backgroundColor:"#7a0012"}}>1min</div>
                            <div className={style.lvl}>Fatalnie</div>
                        </div>

                        <div className={style.markContainer} onClick={addMedium}>
                            <div className={style.mark} style={{backgroundColor:"#ff9966"}}>{lvlRead(fleshCards[fleshCardIndex].lvl).mediumNext}</div>
                            <div className={style.lvl}>Pół na pół</div>
                        </div>

                        <div className={style.markContainer} onClick={addGood}>
                            <div className={style.mark} style={{backgroundColor:"#408140"}}>{lvlRead(fleshCards[fleshCardIndex].lvl).goodNext}</div>
                            <div className={style.lvl}>Łatwe!</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>:<div>Ładowanie...</div>:<div>Ładowanie...</div>}
        </>
    )
}