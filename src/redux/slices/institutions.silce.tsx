import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Institution } from "../../interfaces/data.interfaces";

export const institutionsSlice = createSlice({
	initialState: [] as Institution[],
	name: "institutions",
	reducers: {
		set: (state, action: PayloadAction<Institution[]>) => {
			return action.payload;
		},
		updateOne: (state, action: PayloadAction<{id:string, institution:Institution | undefined}>) => {
			if(action.payload.institution){
				const filtered = state.filter(inst=>inst.id != action.payload.id);
				return [...filtered, action.payload.institution];
			}else{
				return state;
			}
		},
	},
});
