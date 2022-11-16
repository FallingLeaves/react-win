import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";

export interface QuickItem {
	ui: boolean;
	src: string;
	name: string;
	state: string;
	action: string;
}

interface SidepaneState {
	quicks: QuickItem[];
	hide: boolean;
	calhide: boolean;
	banhide: boolean;
}

const initialState: SidepaneState = {
	quicks: [
		{
			ui: true,
			src: "wifi",
			name: "WiFi",
			state: "network.wifi.state",
			action: "toggleWifi",
		},
		{
			ui: true,
			src: "bluetooth",
			name: "Bluetooth",
			state: "devices.bluetooth",
			action: "toggleBluetooth",
		},
		{
			ui: true,
			src: "airplane",
			name: "Flight Mode",
			state: "network.airplane",
			action: "toggleAirplane",
		},
		{
			ui: true,
			src: "saver",
			name: "Battery Saver",
			state: "system.power.saver.state",
			action: "toggleSaver",
		},
		{
			ui: true,
			src: "sun",
			name: "Theme",
			state: "person.theme",
			action: "changeTheme",
		},
		{
			ui: true,
			src: "nightlight",
			name: "Night Light",
			state: "system.display.nightlight.state",
			action: "toggleNightlight",
		},
	],
	hide: true,
	calhide: true,
	banhide: true,
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
		toggleban: (state) => {
			state.banhide = !state.banhide;
		},
		togglePane: (state) => {
			state.hide = !state.hide;
		},
		setThemeSrc: (state, action: PayloadAction<string>) => {
			state.quicks[4].src = action.payload;
		},
	},
});

export const {
	showCal,
	hideCal,
	toggleCal,
	toggleban,
	togglePane,
	setThemeSrc,
} = sidepaneSlice.actions;
export const selectSidepane = (state: RootState) => state.sidepane;

export default sidepaneSlice.reducer;
