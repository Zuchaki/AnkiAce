const initialState={
    user:window.localStorage.getItem("AnkiAce")
}

export default function auth(state=initialState, action){

    switch(action.type){
        case "SingIn":
                window.localStorage.setItem("AnkiAce",JSON.stringify(action.user))
                return{user:window.localStorage.getItem("AnkiAce")}
                     
        default:
            return state
            
    }
}
