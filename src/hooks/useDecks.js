import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios_decks from "../AxiosInstance/axios-decks";
import { useParams } from "react-router-dom";
import useDate from "./useDate";

//let returnFN = axiosGet();

const useDecks = () => {
    const reduxUser = useSelector(state => state.decks.decks);
    const reduxParams = useSelector(state => state.decks.chosen);

    const dispatch = useDispatch();
    const params = useParams();
    const auth = JSON.parse(useSelector(state => state.auth.user));
    const [date, addDate, checkDate] = useDate();

    const setDecks = async () => {
      try {
        const config = {
          params: {
            orderBy: '"localId"',
            equalTo: `"${auth.localId}"`
          }
        };
  
        const res = await axios_decks.get(`decks.json`, config)
        let newDbDecks = [];
        for (const key in res.data) {
          const e = res.data[key];
          //Get fleshCards propertys
          let newFleshCards = []
          let allFleshCards = []    
            const config = {
                params: {
                  orderBy: '"deckId"',
                  equalTo: `"${key}"`
                },
              };              
      
            const resFleshCards = await axios_decks.get(`fleshCards.json`, config)
            for (const key in resFleshCards.data) {
              const fleshE = resFleshCards.data[key];
              //Jeśli data jest przeszła
              await allFleshCards.push({
                front: fleshE.front,
                back: fleshE.back,
                year:fleshE.year,
                month:fleshE.month,
                day: fleshE.day,
                hours:fleshE.hours,
                minute:fleshE.minute,
                deckId: fleshE.deckId,
                localId:fleshE.localId,
                lvl:fleshE.lvl,
                id:key
              })
              if(checkDate(date,{year:fleshE.year,
                      month:fleshE.month,
                      day:fleshE.day,
                      hours:fleshE.hours,
                      minute:fleshE.minute}))
                  {
                      //push do tabeli
                      await newFleshCards.push({
                          front: fleshE.front,
                          back: fleshE.back,
                          year:fleshE.year,
                          month:fleshE.month,
                          day: fleshE.day,
                          hours:fleshE.hours,
                          minute:fleshE.minute,
                          deckId: fleshE.deckId,
                          localId:fleshE.localId,
                          lvl:fleshE.lvl,
                          id:key
                      })
                  }
              }
          newDbDecks.push({color1:e.color1, color2:e.color2, title:e.title, toStudy:newFleshCards.length, count:allFleshCards.length, id:key, favorite:e.favorite});
        }
        
        dispatch({ type: 'Get', decks: newDbDecks });
      } catch(error) {
        console.log("error: ", error.response.data)
      }
    };

    const setUpdate = async(update) => {
        //check the login user
        try{
            const res = await axios_decks.get(`decks/${params.deckId}.json`)
            if(res.data.localId===auth.localId){

                //put favorite
                try{
                    const res = await axios_decks.put(`decks/${params.deckId}.json?auth=${auth.idToken}`,update)
                    setDecks();
                }
                //error put
                catch(error){
                    console.log(error)
                }
            }
        }
        //error auth check
        catch(error){

        }
    }

    const newDeck = async (sendNew) => {
        try{
            //const res = await axiosFireBase.post(`hotels.json?auth=${auth.token}`, {
            const res = await axios_decks.post(`decks.json?auth=${auth.idToken}`,sendNew)
            await console.log(res)
            setDecks();
        }
        catch(error){
            console.log(error)
        }
    }

    const deleteDeck = async (sendNew) => {
      try{
          const res = await axios_decks.delete(`decks/${params.deckId}.json?auth=${auth.idToken}`);
          await console.log(res)
          setDecks();
      }
      catch(error){
          console.log(error)
      }
  }
  
    React.useEffect(() => {
      if(!(Object.keys(date).length === 0)){setDecks()};
    }, [dispatch, date]);
  
    return [reduxUser,setUpdate, newDeck, deleteDeck];
  };
  

export default useDecks;