import React from "react";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult} from 'firebase/auth';
import GoogleIcon from "../../Assets/Icons/GoogleIcon"
import style from "./googleSingIn.module.css"
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APIID
};


const app = initializeApp(firebaseConfig);

const authGoogle = getAuth(app)
const provider = new GoogleAuthProvider();

export default function GoogleSingIn(){
  const history = useNavigate();
  const [auth, setAuth] = useAuth();
  const [errorLogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);

const singInWithGoogle = async () => {
  try{ 
          signInWithPopup(authGoogle,provider).then((data)=>{
            setAuth({
                email: data._tokenResponse.email,
                idToken:data._tokenResponse.idToken,
                localId:data._tokenResponse.localId,
                refreshToken:data._tokenResponse.refreshToken
            })
            history("/profil")
          })
      }
  catch(err){
      if(err){
        console.log(err)
      }
  }
}

return(
  <>
            <div className={style.googleContainer} onClick={singInWithGoogle}>
                <div className={style.google}><span>Zaloguj się przez Google</span> <GoogleIcon className={style.googleIcon}/></div>
            </div>
  </>
);
}