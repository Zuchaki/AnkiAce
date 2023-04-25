import axios from "axios";

const instance = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",

    params: {
        key: "AIzaSyACo2OoOGSBOaHbdi1CGU0cV04gUgJecOs"
    }
})

export default instance;