import { combineReducers } from "@reduxjs/toolkit";
import { MainStore } from "../../interfaces/store.interface";
import { institutionsSlice } from "../slices/institutions.silce";

export const mainReducer = combineReducers<MainStore >({
    institutions:institutionsSlice.reducer,
})