import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";
import { taskApps } from "../utils";

const initialState = {
	system: {
		power: {
			saver: {
				state: false,
			},
			battery: 100,
		},
		display: {
			brightness: 100,
			nightlight: {
				state: false,
			},
			connect: false,
		},
	},
	person: {
		name: "jack",
		theme: "light",
		color: "blue",
	},
	devices: {
		bluetooth: false,
	},
	network: {
		wifi: {
			state: true,
		},
		airplane: false,
	},
	privacy: {
		loction: {
			state: false,
		},
	},
};

document.body.dataset.theme = initialState.person.theme;

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {},
});

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
