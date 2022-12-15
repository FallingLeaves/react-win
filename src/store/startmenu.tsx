import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { AppItem } from "@/utils/apps";
import { pinnedApps, recentApps } from "@/utils";
import { AppStatus } from "./apps";

export interface Empty {
	empty: boolean;
}

type pnApps = AppItem[] | Empty[];

export interface StartmenuStatus {
	pnApps: pnApps;
	rcApps: AppItem[];
	hide: boolean;
	menu: boolean;
	showAll: boolean;
	alpha: boolean;
	pwctrl: boolean;
	curAlpha: string;
	allApps: AppStatus[];
	contApps: AppStatus[][];
}

const initialState: StartmenuStatus = {
	pnApps: pinnedApps,
	rcApps: recentApps,
	hide: true,
	menu: false,
	showAll: false,
	alpha: false,
	pwctrl: false,
	curAlpha: "A",
	allApps: [],
	contApps: [],
};

export const startmenuSlice = createSlice({
	name: "startmenu",
	initialState,
	reducers: {
		startShow: (state) => {
			state.menu = true;
			state.hide = false;
			state.pwctrl = false;
		},
		startHide: (state) => {
			state.hide = true;
			state.showAll = false;
			state.pwctrl = false;
		},
		startToggle: (state) => {
			state.hide = !(state.hide || !state.menu);
			state.menu = true;
			state.alpha = false;
			state.curAlpha = "A";
			state.pwctrl = false;
			state.showAll = state.menu && state.showAll ? true : false;
		},
	},
});

export const { startShow, startHide, startToggle } = startmenuSlice.actions;
export const selectApps = (state: RootState) => state.startmenu;

export default startmenuSlice.reducer;
