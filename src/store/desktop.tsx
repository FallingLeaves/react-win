import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";
import { desktopApps } from "@/utils";

export enum SortType {
	none = "none",
	name = "name",
	date = "date",
	size = "size",
}

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
	sort: SortType.none,
	abOpen: false,
};

export const desktopSlice = createSlice({
	name: "desktop",
	initialState,
	reducers: {},
});

export const selectDesktop = (state: RootState) => state.desktop;

export default desktopSlice.reducer;
