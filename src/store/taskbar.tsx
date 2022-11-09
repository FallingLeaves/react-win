import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";
import { taskApps } from "../utils";

interface TaskbarState {
	apps: any[];
	prev: boolean;
	prevApp: string;
	prevPos: number;
	align: "left" | "center";
	search: boolean;
	widgets: boolean;
	audio: number;
}

const initialState: TaskbarState = {
	apps: taskApps,
	prev: false,
	prevApp: "",
	prevPos: 0,
	align: "center",
	search: true,
	widgets: true,
	audio: 3,
};

export const taskbarSlice = createSlice({
	name: "taskbar",
	initialState,
	reducers: {
		center: (state) => {
			state.align = "center";
		},
		left: (state) => {
			state.align = "left";
		},
		toggle: (state) => {
			if (state.align === "center") {
				state.align = "left";
			} else {
				state.align = "center";
			}
		},
	},
});

export const { center, left, toggle } = taskbarSlice.actions;
export const selectTaskbar = (state: RootState) => state.taskbar;

export default taskbarSlice.reducer;
