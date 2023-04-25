import React, {useState, useEffect, useMemo} from "react";
import style from "./NewFleshCard.module.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useDate from "../../../../../hooks/useDate";
import axios_decks from "../../../../../AxiosInstance/axios-decks"
import useAuth from "../../../../../hooks/useAuth";
import {MdAddTask} from "react-icons/md"
import { useParams } from "react-router-dom";

export default function NewFleshCard(props){
    useEffect(() => {
        // called before any tests are run
        const e = window.onerror;
        window.onerror = function(err) {
          if(err === 'ResizeObserver loop limit exceeded') {
            console.warn('Ignored: ResizeObserver loop limit exceeded');
            return false;
          } else {
            return e(...arguments);
          }
        }
      },[]);

      useMemo(()=>{
        const e = window.onerror;
        window.onerror = function(err) {
          if(err === 'ResizeObserver loop limit exceeded') {
            console.warn('Ignored: ResizeObserver loop limit exceeded');
            return false;
          } else {
            return e(...arguments);
          }
        }
      },[props.color])

    const [modules] = useState({
        toolbar:[
            [/*{size:["large", false, "small"]}*/, /*{ 'align': [] }*/],
            [ "bold", "italic", "underline", "strike", "blockquote"],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'script': 'sub'}, { 'script': 'super' }],
        ]
    })
    const [auth] = useAuth();
    const [valueFront, setValueFront] = useState("");
    const [valueBack, setValueBack] = useState("");
    const [currentDate] = useDate();
    const params = useParams();
    const [added, setAdded] = useState(false)
    //<div className={style.preview} dangerouslySetInnerHTML={{ __html:value}}/>

    const createFleshCard = async () => {
      if(currentDate && auth){
        try{
            //const res = await axiosFireBase.post(`hotels.json?auth=${auth.token}`, {
            const res = await axios_decks.post(`fleshCards.json?auth=${auth.idToken}`,{
                front: valueFront,
                back: valueBack,
                year:currentDate.year,
                month:currentDate.month,
                day: currentDate.day,
                hours:currentDate.hours,
                minute:currentDate.minute,
                deckId: params.deckId,
                localId:auth.localId,
                lvl: 1
            })
            await setAdded(true);
            await console.log(res)
            await setValueFront("");
            await setValueBack("");
            await setTimeout(()=>{
              setAdded(false);
            },2000)
            

        }
        catch(error){
            console.log(error)
        }
      }
  }

    return(
        <>
        {added?<div className={style.addedMain}>
          <div><MdAddTask size={120} color="#2a8529"/></div>
          <div>Dodanow nową fiszkę!</div>
        </div>:<></>}
        <div className={style.container}>
            <div className={style.col}>
                <div className={style.row}>
                    <div className={style.col}>
                        <div className={style.sideName}>Przód</div>
                        <div className={style.editor}>
                            <ReactQuill 
                                theme="snow" 
                                value={valueFront} 
                                onChange={setValueFront}
                                className={style.reactQuill}
                                modules={modules}
                                style={{border:`2px solid ${props.color}`}}
                            />
                        </div>
                    </div>
                    <div className={style.col}>
                        <div className={style.sideName}>Tył</div>
                        <div className={style.preview}>
                            <ReactQuill 
                                theme="snow" 
                                value={valueBack} 
                                onChange={setValueBack}
                                className={style.reactQuill}
                                modules={modules}
                                style={{border:`2px solid ${props.color}`}}
                            />
                        </div>
                    </div>
                </div>
                    <div className={style.add} onClick={createFleshCard}>Dodaj</div>
            </div>
        </div>
        </>
    )
}