import axios from "axios";

const instance = axios.create({
    baseURL: "https://anki-app-5c08c-default-rtdb.europe-west1.firebasedatabase.app/",
})

export default instance;