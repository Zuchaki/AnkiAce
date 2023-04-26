import axios_decks from "../../AxiosInstance/axios-decks"
const initialState={
    decks:[],
}

export default function decks(state=initialState, action){

    switch(action.type){
        case "Get":
            return{decks:action.decks}
                     
        default:
            return state
            
    }
}
