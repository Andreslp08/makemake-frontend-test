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
		// add: (state, action: PayloadAction<Todo>) => {
		// 	state.push(action.payload);
		// },
		// delete: (state, action: PayloadAction<Todo>) => {
		// 	return state.filter((todo) => todo.id != action.payload.id);
		// },
		// update: (state, action: PayloadAction<Todo>) => {
		// 	const todos = state.filter((todo) => todo.id != action.payload.id);
		// 	todos.push(action.payload);
		// 	return todos;
		// },
		// setActive: (state, action: PayloadAction<{ todoId: number; active: boolean }>) => {
		// 	let todo = _.clone(state.find((todo) => todo.id == action.payload.todoId));
		// 	if (todo) {
		// 		todo.active = action.payload.active;
		// 		const todos = state.filter((todo) => todo.id != action.payload.todoId);
		// 		todos.push(todo);
		// 		return todos;
		// 	} else {
		// 		return state;
		// 	}
		// },
		// set: (state, action: PayloadAction<Todo[]>) => {
		// 	return action.payload;
		// },
	},
});
