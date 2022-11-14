import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";
import { desktopApps } from "@/utils";

export type SortType = "none" | "name" | "date" | "size";

interface DesktopState {
	apps: any[];
	hide: boolean;
	size: number;
	sort: SortType;
	abOpen: boolean;
}

const initialState: DesktopState = {
	apps: desktopApps,
	hide: false,
	size: 1,
	sort: "none",
	abOpen: false,
};

export const desktopSlice = createSlice({
	name: "desktop",
	initialState,
	reducers: {
		changeSize: (state, action: PayloadAction<number>) => {
			state.size = action.payload;
		},
	},
});

export const { changeSize } = desktopSlice.actions;
export const selectDesktop = (state: RootState) => state.desktop;

export default desktopSlice.reducer;
