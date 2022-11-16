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
	reducers: {
		setBrightness: (state, action: PayloadAction<number>) => {
			state.system.display.brightness = action.payload;
		},
		saverToggle: (state) => {
			state.system.power.saver.state = !state.system.power.saver.state;
		},
		nightlightToggle: (state) => {
			state.system.display.nightlight.state =
				!state.system.display.nightlight.state;
		},
		bluetoothToggle: (state) => {
			state.devices.bluetooth = !state.devices.bluetooth;
		},
		wifiToggle: (state) => {
			state.network.wifi.state = !state.network.wifi.state;
		},
		airplaneToggle: (state) => {
			state.network.airplane = !state.network.airplane;
		},
		setTheme: (state, action: PayloadAction<string>) => {
			state.person.theme = action.payload;
		},
	},
});

export const {
	setBrightness,
	saverToggle,
	nightlightToggle,
	bluetoothToggle,
	wifiToggle,
	airplaneToggle,
	setTheme,
} = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
