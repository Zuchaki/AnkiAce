import React, { useState } from "react";
import style from "./ListElement.module.css"
import {BsChevronCompactDown, BsChevronCompactUp} from 'react-icons/bs'
import {MdModeEdit, MdDeleteOutline} from 'react-icons/md'
import {BiShow} from 'react-icons/bi'
import {SlOptionsVertical} from 'react-icons/sl'
import {GiCancel} from 'react-icons/gi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios_decks from "../../../../../AxiosInstance/axios-decks"
import useAuth from "../../../../../hooks/useAuth";

export default function ListElement(props){

    const [show, setshow] = useState(false);
    const [deleteQ, setDeleteQ] = useState(false);
    const [auth] = useAuth();

    const deleteFleshCard = async (id) => {
        try{
            const res = await axios_decks.delete(`fleshCards/${id}.json?auth=${auth.idToken}`);
            await console.log(res);
            await setDeleteQ(false);
            window.location.reload(true);
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <>
        {deleteQ?
            <div className={style.moreOptionsListElement}>
            <div className={style.moreOptionsBackground}></div>
                <div className={style.moreOptionsIconMain}>
                    <div className={style.moreOptionsIconContainer}>
                        <div className={style.moreQuestion}>Czy na pewno chcesz usunąć?</div>
                        <div className={style.moreQuestionMore}>Ta czynność spowoduje trwałe usunięcie fiszki bez możliwości jej przywrócenia. czy jesteś pewien, że chcesz kontynuować?</div>
                        <div className={style.moreAnswerContainer}>
                            <div className={style.moreAnswer} style={{backgroundColor:"#dc3545"}} onClick={() => deleteFleshCard(props.id)}>Tak</div>
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
        {show?
            <div style={{border:`2px solid ${props.color2}`}} className={style.listElement}>

                <div className={style.listTitleContainer}>
                    <div className={style.listName}>
                        <div dangerouslySetInnerHTML={{ __html:props.front}}/>
                    </div>
                    <BsChevronCompactUp className={style.editIconMore} size={24} color="#555555" onClick={() => setshow(!show)}/>  
                </div> 


                <div className={style.listTitleContainer}>
                    <div className={`${style.listNameBack}`} style={{color:props.color1}}>
                        <div dangerouslySetInnerHTML={{ __html:props.back}}/>
                    </div> 
                </div> 


                <div className={style.listElementMoreMain}>
                    <div className={style.nextStudyDate}><span style={{marginRight:6 + "px"}}>{props.time.hours}:{props.time.minute}</span> {props.time.day}.{props.time.month}.{props.time.year}</div>   
                    <div className={style.listElementMoreContainer}>
                        <MdModeEdit size={34} className={style.editIconMore} color="white" onClick={() => props.setEditFleshCard({
                            id:props.id,
                            open:true,
                            front:props.front,
                            back:props.back,
                            time:props.time
                        })}
                            style={{
                                color: "#ffc107",
                                borderRadius: 6 + "px"
                            }}
                        />
                        <MdDeleteOutline size={34} className={style.editIconMore} color="white" onClick={() => setDeleteQ(true)}
                            style={{
                                color: "#dc3545",
                                borderRadius: 6 + "px"
                            }}
                        />
                    </div> 
                </div>

            </div>
            :
            <div style={{border:`2px solid ${props.color2}`}} className={style.listElement}>
                <div className={style.listTitleContainer}>
                    <div className={style.listName}>
                        {<div dangerouslySetInnerHTML={{ __html:props.front}}/>}
                    </div>
                    <SlOptionsVertical className={style.editIconMore} size={20} color="#777777" onClick={() => setshow(!show)}/>  
                </div>
            </div>
        }
        </>
    )
}