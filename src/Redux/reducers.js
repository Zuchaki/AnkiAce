import { combineReducers } from "@reduxjs/toolkit";
import auth from "./Reducers/auth";
import decks from "./Reducers/decks.js";

export default combineReducers({
    auth,
    decks
})