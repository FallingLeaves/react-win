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
	},
});

export const { changeSize, changeSort } = desktopSlice.actions;
export const selectDesktop = (state: RootState) => state.desktop;

export default desktopSlice.reducer;
