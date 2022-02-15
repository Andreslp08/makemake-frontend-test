import { configureStore} from "@reduxjs/toolkit";
import { mainReducer } from "./reducers/main-reducer";

export const store = configureStore({
    reducer:mainReducer,
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
