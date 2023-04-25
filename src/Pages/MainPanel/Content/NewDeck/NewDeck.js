import React, { useEffect, useState } from "react";
import style from "./NewDeck.module.css"
import DeckElement from "../../DeckElement/DeckElement";
import Add_ICON from "../../../../Assets/Icons/Add_ICON";
import CircleLabel from "./CircleLabel/CircleLabel";
import axios_decks from "../../../../AxiosInstance/axios-decks";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useDecks from "../../../../hooks/useDecks";

export default function NewDeck() {
    let i = 0;

    const [selectedValue, setSelectedValue] = useState("");
    const [auth] = useAuth();
    const history = useNavigate();
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const [property, setProperty] = useState({
        color1:"gray",
        color2:"gray",
        title:"",

    })
    const [decks, updateDeck, newDeck] = useDecks()

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

    useEffect(()=> {
        checkProperty();
    }, [property])


    const dbSend = async () => {
        await newDeck({
            color1: property.color1,
            color2: property.color2,
            title: property.title,
            localId: auth.localId,
            favorite: false
        })
        history("/profil")
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
            <input className={style.titleInput} type="text" onChange={titleChangeHandler}/>
            
        </div>
        
        <div className={style.simpleDeckElement}>
            <DeckElement color1={property.color1} color2={property.color2} title={property.title} toStudy="" count=""/>
        </div>

        {buttonDisplay?
            <button className={style.buttonContainer} onClick={dbSend}>
                <div className={style.buttonTitle}>Dodaj</div>
                <div className={style.button}><Add_ICON/></div>
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
