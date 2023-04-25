import React, { useEffect, useState } from "react";
import style from "./UpdateDeck.module.css"
import DeckElement from "../../DeckElement/DeckElement";
import Add_ICON from "../../../../Assets/Icons/Add_ICON";
import CircleLabel from "./CircleLabel/CircleLabel";
import axios_decks from "../../../../AxiosInstance/axios-decks";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import useDecks from "../../../../hooks/useDecks";
import {TbEdit} from "react-icons/tb"

export default function UpdateDeck() {
    let i = 0;

    const [selectedValue, setSelectedValue] = useState();
    const [auth] = useAuth();
    const history = useNavigate();
    const params = useParams();
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const [favoriteGet, setFavoriteGet] = useState(false)
    const [decks, updateDeck, newDeck] = useDecks();
    const [property, setProperty] = useState({
        color1:"gray",
        color2:"gray",
        title:"",
    })

    const handleChange = (event, colora, colorb) => {
        setSelectedValue(event.target.value);
        setProperty({...property, color1:colora, color2:colorb})
    };

    const titleChangeHandler = (e) => {
        setProperty({...property, title:e.target.value})
    }

    const valueName = () => {
        i++;
        return(`ValueOption-${i}`);
    }
    const Theme = [
        ["#6d56e5","#a291f1"], 
        ["#ed601b","#ed9563"], 
        ["#d9184d","#e5678c"], 
        ["#1f63c4","#689ddf"], 
        ["#257580","#69a0a7"], 
        ["#222222","#555555"],
        ["#e66767","#ea8685"]
    ]

    const checkProperty = () => {
        if(property.title!=="" && property.color1!=="gray" && property.color2!=="gray"){
            setButtonDisplay(true);
        }
        else{
            setButtonDisplay(false)
        }
    }   

    const getInitialyProperty = async () => {
        try{   
            const res = await axios_decks.get(`decks/${params.deckId}.json`)
            await setProperty({
                color1:res.data.color1,
                color2:res.data.color2,
                title:res.data.title,
            })
            await setFavoriteGet(res.data.favorite)
            if(res.data.localId!==auth.localId){
                history("/Profil");
            }

        }   
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {
        checkProperty();
    }, [property])

    useEffect(()=>{
        getInitialyProperty();
    },[])

    
    const dbSend = async () => {
        await updateDeck({
            color1: property.color1,
            color2: property.color2,
            title: property.title,
            localId: auth.localId,
            favorite: favoriteGet
        })
        history(`../../Profil/talia/${params.deckId}`)
    }

  return (
    <div className={style.main}>
        <div className={style.addNewDeck}>Dodaj nową talię</div>
        <div className={style.recommendation}>Wybierz kolor:</div>
        <div className={style.colorsContainer}>

        {Theme.map(theme => (
            <CircleLabel
                value = {valueName()} 
                color1={theme[0]}
                color2={theme[1]}
                onChange={handleChange}
                selectedValue={selectedValue}
            />
        ))}
        
        
        </div>
        <div className={style.recommendation}>Podaj nazwę tali:</div>
        <div className={style.titleContainer}>
            <div className={style.title}></div>
            <input className={style.titleInput} type="text" value={property.title} onChange={titleChangeHandler}/>
            
        </div>
        
        <div className={style.simpleDeckElement}>
            <DeckElement color1={property.color1} color2={property.color2} title={property.title} toStudy="" count=""/>
        </div>

        {buttonDisplay?
            <button className={style.buttonContainer} onClick={dbSend}>
                <div className={style.buttonTitle}>Edytuj</div>
                <div className={style.button}><TbEdit size={24} color={"white"} /></div>
            </button>
            :
            <button className={style.buttonContainerOFF}>
                <div className={style.buttonTitle}>Wybierz swoje personalizacje</div>
                <div className={style.button}></div>
            </button>
            }
    </div>
  );
}
