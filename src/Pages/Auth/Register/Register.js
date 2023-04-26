import React, {useEffect} from "react";
import style from "./Register.module.css"
import RegisterLeft from "./RegisterLeft/RegisterLeft";
import RegisterRight from "./RegisterRight/RegisterRight";
import useSizeScreen from "../../../hooks/useSizeScreen";
import axios from "../../../AxiosInstance/axios-auth"
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function Register(){

    const [width, height] = useSizeScreen()
    const history = useNavigate()
    const [auth, setAuth] = useAuth();

    const singInChechk = async () => {
        try{
        const res = await axios.post("accounts:lookup",{
            idToken:auth.idToken
        })
        if(res.status===200){
            await history("/profil")
            window.location.reload(true);
        }
        }
        catch(error){
            localStorage.removeItem("AnkiAce");
        }
    }

    useEffect(()=>{
        singInChechk();
    },[])

    return(
        <>
            <div className={style.main}>
                <div className={style.container}>
                    {width>1350?
                    <div className={style.left}>
                        <RegisterLeft/>
                    </div>:
                    <></>
                    }
                    <div className={style.right}>
                        <RegisterRight/>
                    </div>
                </div>
            </div>
        </>
    )
}