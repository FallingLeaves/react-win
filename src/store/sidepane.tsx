import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";

const initialState = {
	hide: true,
	calhide: true,
};

export const sidepaneSlice = createSlice({
	name: "sidepane",
	initialState,
	reducers: {
		showCal: (state) => {
			state.calhide = true;
		},
		hideCal: (state) => {
			state.calhide = false;
		},
		toggleCal: (state) => {
			state.calhide = !state.calhide;
		},
	},
});

export const { showCal, hideCal, toggleCal } = sidepaneSlice.actions;
export const selectSidepane = (state: RootState) => state.sidepane;

export default sidepaneSlice.reducer;
