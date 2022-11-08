import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const LOCK_KEY = "__locked__";
const WPS_KEY = "__wps__";

let wps = localStorage.getItem(WPS_KEY) || 0;
let locked = localStorage.getItem(LOCK_KEY);

const walls = [
	"default/img0.jpg",
	"dark/img0.jpg",
	"ThemeA/img0.jpg",
	"ThemeA/img1.jpg",
	"ThemeA/img2.jpg",
	"ThemeA/img3.jpg",
	"ThemeB/img0.jpg",
	"ThemeB/img1.jpg",
	"ThemeB/img2.jpg",
	"ThemeB/img3.jpg",
	"ThemeC/img0.jpg",
	"ThemeC/img1.jpg",
	"ThemeC/img2.jpg",
	"ThemeC/img3.jpg",
	"ThemeD/img0.jpg",
	"ThemeD/img1.jpg",
	"ThemeD/img2.jpg",
	"ThemeD/img3.jpg",
];

const themes = ["default", "dark", "ThemeA", "ThemeB", "ThemeD", "ThemeC"];

interface WallpaperState {
	themes: string[];
	wps: number;
	src: string;
	locked: boolean;
	booted: boolean;
	act: string;
	dir: 0 | -1;
}

const initialState: WallpaperState = {
	themes: themes,
	wps: +wps,
	src: walls[+wps],
	locked: locked == "false" ? false : true,
	booted: false,
	act: "",
	dir: 0,
};

export const wallpaperSlice = createSlice({
	name: "wallpaper",
	initialState,
	reducers: {
		unlock: (state) => {
			localStorage.setItem(LOCK_KEY, "false");
			state.locked = false;
			state.dir = 0;
		},
		next: (state) => {
			const twps = (state.wps + 1) % walls.length;
			localStorage.setItem(WPS_KEY, twps + "");
			state.wps = twps;
			state.src = walls[twps];
		},
		lock: (state) => {
			state.locked = true;
			state.dir = -1;
		},
		booted: (state) => {
			state.booted = true;
			state.dir = 0;
			state.act = "";
		},
		restart: (state) => {
			state.booted = false;
			state.dir = -1;
			state.locked = true;
			state.act = "restart";
		},
	},
});

export const { unlock, next, lock, booted, restart } = wallpaperSlice.actions;
export const selectWallpaper = (state: RootState) => state.wallpaper;

export default wallpaperSlice.reducer;
