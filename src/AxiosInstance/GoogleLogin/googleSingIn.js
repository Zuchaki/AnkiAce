import React from "react";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult} from 'firebase/auth';
import GoogleIcon from "../../Assets/Icons/GoogleIcon"
import style from "./googleSingIn.module.css"
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyACo2OoOGSBOaHbdi1CGU0cV04gUgJecOs",
  authDomain: "anki-app-5c08c.firebaseapp.com",
  projectId: "anki-app-5c08c",
  storageBucket: "anki-app-5c08c.appspot.com",
  messagingSenderId: "174021346594",
  appId: "1:174021346594:web:54937e810c897f952e117b"
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