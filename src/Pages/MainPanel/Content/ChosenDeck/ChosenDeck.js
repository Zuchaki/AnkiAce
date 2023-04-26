import React, { useState, useEffect } from "react";
import FavoriteAdded_ICON from "../../../../Assets/Icons/FavoriteAdded_ICON";
import FavoriteAdd_ICON from "../../../../Assets/Icons/FavoriteAdd_ICON";
import DeckElement from "../../DeckElement/DeckElement";
import style from "./ChosenDeck.module.css"
import ListElement from "./ListElement/ListElement";
import NewFleshCard from "./NewFleshCard/NewFleshCard";
import {IoIosArrowRoundBack} from "react-icons/io";
import {TbEdit} from "react-icons/tb"
import {MdDeleteOutline} from "react-icons/md"
import {HiOutlineSquaresPlus} from "react-icons/hi2"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios_decks from "../../../../AxiosInstance/axios-decks";
import axios_auth from "../../../../AxiosInstance/axios-auth"
import useAuth from "../../../../hooks/useAuth";
import useDecks from "../../../../hooks/useDecks";
import useDate from "../../../../hooks/useDate";
import EditFleshCard from "./EditFleshCard/EditFleshCard";
import useSizeScreen from "../../../../hooks/useSizeScreen";
import {IoOptions} from "react-icons/io5"
export default function ChosenDeck(){
    const [deckInfo, setDeckInfo] = useState()

    const params = useParams();
    const history = useNavigate();

    const [newFleshCard, setNewFleshCard] = useState(false);
    const [editFleshCard, setEditFleshCard] = useState({id:0,open:false,fron:"",back:""});
    const [auth, setAuth] = useAuth();
    const [deleteQ, setDeleteQ] = useState(false);
    const [date, addDate, checkDate] = useDate();
    const [db, setDb] = useState([])
    const [studyDb, setStudyDb] = useState([])
    const [width, height] = useSizeScreen();
    const [decks, setUpdate, newDeck, setDeleteDeck] = useDecks()
    const [mobileOptions, setMobileOpctions] = useState(false);
    const [mobileOptionsAnimation, setMobileOptionsAnimation] = useState(0)

    const favoriteOnClickHandler = () => {
        setUpdate({
            color1:deckInfo.color1,
            color2:deckInfo.color2,
            title:deckInfo.title,
            favorite: !deckInfo.favorite,
            localId:auth.localId
        })
        setDeckInfo({...deckInfo, favorite:!deckInfo.favorite});
    }


    const loadData = async () => {
        try{   
            const res = await axios_decks.get(`decks/${params.deckId}.json`)

            await setDeckInfo({
                color1:res.data.color1,
                color2:res.data.color2,
                title:res.data.title,
                toStudy: 3,
                count: 2,
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

    const deleteDeckHandler = async () => {
        try {       
            for (const key in db) {
                const id = db[key].id;
                const res = await axios_decks.delete(`fleshCards/${id}.json?auth=${auth.idToken}`)
                console.log(res);
              }                  
            await setDeleteDeck();
            await history("/Profil");

          } catch(error) {
            console.log("error: ", error.response.statusText)
          }
    }

    const getFleshCards = async () => {
        try {
            const config = {
                params: {
                  orderBy: '"deckId"',
                  equalTo: `"${params.deckId}"`
                },
              };              
      
            const res = await axios_decks.get(`fleshCards.json`, config)
            let newDbDecks = await [];
            let toStudyDB = await [];
            for (const key in res.data) {
              const e = res.data[key];
              await newDbDecks.push({front:e.front, back:e.back, id:key, year:e.year, month:e.month, day:e.day, hours:e.hours, minute:e.minute});
              if(checkDate(date,{
                    year:e.year,
                    month:e.month,
                    day:e.day,
                    hours:e.hours,
                    minute:e.minute}))
                {
                //push do tabeli
                    await toStudyDB.push({
                            id:key
                    })
                }
            }
            await setDb(newDbDecks)
            await setStudyDb(toStudyDB)

            console.log(res)
          } catch(error) {
            console.log("error: ", error)
          }
    }

    const backToChousenDeck = async () => {
        await setNewFleshCard(false);
        window.location.reload(true);

    }
   

    useEffect(()=>{
        loadData();
        if(!(Object.keys(date).length === 0)){getFleshCards()};
    },[params.deckId, date])

    return deckInfo ? (
        <>
        {deleteQ?
            <div className={style.moreOptionsListElement}>
            <div className={style.moreOptionsBackground}></div>
                <div className={style.moreOptionsIconMain}>
                    <div className={style.moreOptionsIconContainer}>
                        <div className={style.moreQuestion}>Czy na pewno chcesz usunąć?</div>
                        <div className={style.moreQuestionMore}>Ta czynność spowoduje trwałe usunięcie fiszki bez możliwości jej przywrócenia. czy jesteś pewien, że chcesz kontynuować?</div>
                        <div className={style.moreAnswerContainer}>
                            <div className={style.moreAnswer} style={{backgroundColor:"#dc3545"}} onClick={deleteDeckHandler}>Tak</div>
                            <div 
                                className={style.moreAnswer}
                                onClick={()=>setDeleteQ(false)}>Nie</div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
        }
        <div className={style.main}>
        {editFleshCard.open? 
            <>
                <div className={style.deckElementContainer}>
                    <div className={style.deckElementTop}>
                        <div style={{backgroundColor:deckInfo.color1}} className={style.deckTitle}>{deckInfo.title}</div>
                    </div>


                    <div className={style.deckElementBottom}>
                        <div className={style.deckElementLeft}>
                            <div style={{backgroundColor:deckInfo.color2}} className={style.toStudyContainer} onClick={backToChousenDeck}>
                                    <span className={style.toStudyWordSpan}><IoIosArrowRoundBack size={30}/> Wróć</span>
                            </div>
                        </div>
                    </div>
                    {//<DeckElement color1={deckInfo.color1} color2={deckInfo.color2} title={deckInfo.title} toStudy="2" count="3"/>
                    }

                </div>



                <div className={style.container}>
                    <EditFleshCard color={deckInfo.color1} id={editFleshCard.id} setEditFleshCard = {setEditFleshCard} editFleshCard={editFleshCard}/>
                </div>
            </>:
            newFleshCard? 
            <>
                <div className={style.deckElementContainer}>
                    <div className={style.deckElementTop}>
                        <div style={{backgroundColor:deckInfo.color1}} className={style.deckTitle}>{deckInfo.title}</div>
                    </div>


                    <div className={style.deckElementBottom}>
                        <div className={style.deckElementLeft}>
                            <div style={{backgroundColor:deckInfo.color2}} className={style.toStudyContainer} onClick={backToChousenDeck}>
                                    <span className={style.toStudyWordSpan}><IoIosArrowRoundBack size={30}/> Wróć</span>
                            </div>
                        </div>
                    </div>
                    {//<DeckElement color1={deckInfo.color1} color2={deckInfo.color2} title={deckInfo.title} toStudy="2" count="3"/>
                    }

                </div>



                <div className={style.container}>
                    <NewFleshCard color={deckInfo.color1}/>
                </div>
                </>


:

                <>
                <div className={style.deckElementContainer}>
                    <div className={style.deckElementTop}>
                        <div style={{backgroundColor:deckInfo.color1}} className={style.deckTitle}>{deckInfo.title}</div>
                    </div>


                    <div className={style.deckElementBottom}>
                        <div className={style.deckElementLeft}>
                            {studyDb.length===0?
                            <div style={{backgroundColor:deckInfo.color2, textDecoration:"none"}} className={style.toNotStudyContainer}>
                                <span className={style.toStudyWordSpan}>Odpoczynek</span>
                            </div>:
                            <Link to={`../nauka/${params.deckId}`} style={{backgroundColor:deckInfo.color2, textDecoration:"none"}} className={style.toStudyContainer}>
                                    <span className={style.toStudyWordSpan}>Start nauka!</span>
                            </Link>
                            }
                            <div className={style.toStudyNumberSpan}>{studyDb.length}/<span className={style.spanGray}>{db.length}</span></div>
                        </div>
                        {width<1100?
                            mobileOptions?
                            <div className={mobileOptionsAnimation?style.mobileOptionsMainOn:style.mobileOptionsMainOff}>
                                <div className={style.mobileOptionsContainer}>
                                    <div className={style.anOption} onClick={()=>setDeleteQ(true)}><MdDeleteOutline size={48} color={"#bc3545"}/></div>
                                    <Link to={`../../profil/edytujTalie/${params.deckId}`}><div className={style.anOption}><TbEdit size={48} color={"#444444"} /></div></Link>
                                    <div className={style.anOption} onClick={favoriteOnClickHandler}>{deckInfo.favorite?<FavoriteAdded_ICON/>:<FavoriteAdd_ICON/>}</div>
                                    <div className={style.anOption}><IoOptions size={38} onClick={() => {
                                        setMobileOptionsAnimation(false);
                                        setTimeout(()=>{
                                            setMobileOpctions(false);
                                        },500)}}/></div>
                                </div>
                            </div>
                            :
                            <div className={style.mobileIcon}>
                                <IoOptions size={28} onClick={() => {setMobileOpctions(true); setMobileOptionsAnimation(true)}}/>
                            </div>
                        :<div className={style.deckElementRight}>
                            <div className={style.anOption} onClick={()=>setDeleteQ(true)}><MdDeleteOutline size={48} color={"#bc3545"}/></div>
                            <Link to={`../../profil/edytujTalie/${params.deckId}`}><div className={style.anOption}><TbEdit size={48} color={"#444444"} /></div></Link>
                            <div className={style.anOption} onClick={favoriteOnClickHandler}>{deckInfo.favorite?<FavoriteAdded_ICON/>:<FavoriteAdd_ICON/>}</div>
                        </div>}
                    </div>
                    {//<DeckElement color1={deckInfo.color1} color2={deckInfo.color2} title={deckInfo.title} toStudy="2" count="3"/>
                    }

                </div>


                <div className={style.container}>
                    <div className={style.listContainer}>
                            <div className={style.newElement}style={{
                                border:`2px solid ${deckInfo.color1}`,
                                backgroundColor:deckInfo.color1}} onClick={()=>setNewFleshCard(true)}>
                                <HiOutlineSquaresPlus size={28} color={"white"}/>
                            </div>
                            {console.log(db)}
                            {db.map(e=>(
                                <ListElement
                                    id={e.id} 
                                    setEditFleshCard = {setEditFleshCard}
                                    color1 = {deckInfo.color1}
                                    color2={deckInfo.color2}
                                    front={e.front}
                                    back={e.back}
                                    time={{
                                        hours:e.hours,
                                        minute:e.minute,
                                        day:e.day,
                                        year:e.year,
                                        month:e.month
                                        }
                                    }
                                />
                            ))} 
                        
                    </div>
                </div>
            </>
            }
            </div>
            <div style={{backgroundColor:deckInfo.color2}} className={style.footer}></div>  
        </>
    ):(<div>Ładowanie</div>)
}