import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";
import { desktopApps } from "@/utils";
import { AppItem } from "@/utils/apps";

export type SortType = "none" | "name" | "date" | "size";

interface DesktopState {
	apps: AppItem[];
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
		changeSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		show: (state) => {
			state.hide = false;
		},
		hide: (state) => {
			state.hide = true;
		},
		toggle: (state) => {
			state.hide = !state.hide;
		},
	},
});

export const { changeSize, changeSort, show, hide, toggle } =
	desktopSlice.actions;
export const selectDesktop = (state: RootState) => state.desktop;

export default desktopSlice.reducer;
