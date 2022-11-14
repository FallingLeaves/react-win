import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";

enum MenuType {
	desk = "desk",
	task = "task",
	app = "app",
}

export interface MenuOpt {
	name?: string;
	action?: string;
	payload?: string | boolean;
	dot?: boolean;
	check?: boolean;
	type?: string;
	icon?: string;
	opts?: MenuOpt[];
}

interface MenuStyle {
	width: string;
	secwid: string;
	ispace?: boolean;
}

interface MenusState {
	hide: boolean;
	top: number;
	left: number;
	opts: MenuType | string;
	data: { [key: string]: MenuStyle };
	menus: { [key: string]: MenuOpt[] };
}

export interface MenuPayload {
	top?: number;
	left?: number;
	menu?: MenuType | string;
}

const initialState: MenusState = {
	hide: true,
	top: 0,
	left: 0,
	opts: MenuType.desk,
	data: {
		desk: {
			width: "310px",
			secwid: "200px",
		},
		task: {
			width: "220px",
			secwid: "120px",
			ispace: false,
		},
		app: {
			width: "310px",
			secwid: "200px",
		},
	},
	menus: {
		desk: [
			{
				name: "View",
				icon: "view",
				type: "svg",
				opts: [
					{
						name: "Large icons",
						action: "changeIconSize",
						payload: "large",
					},
					{
						name: "Medium icons",
						action: "changeIconSize",
						payload: "medium",
					},
					{
						name: "Small icons",
						action: "changeIconSize",
						payload: "small",
						dot: true,
					},
					{
						type: "hr",
					},
					{
						name: "Show desktop icons",
						action: "deskHide",
						check: true,
					},
				],
			},
			{
				name: "Sort by",
				icon: "sort",
				type: "svg",
				opts: [
					{
						name: "Name",
						action: "changeSort",
						payload: "name",
					},
					{
						name: "Size",
						action: "changeSort",
						payload: "size",
					},
					{
						name: "Date modified",
						action: "changeSort",
						payload: "date",
					},
				],
			},
			{
				name: "Refresh",
				action: "refresh",
				type: "svg",
				icon: "refresh",
			},
			{
				type: "hr",
			},
			{
				name: "New",
				icon: "New",
				type: "svg",
				opts: [
					{
						name: "Folder",
					},
					{
						name: "Shortcut",
					},
					{
						name: "Text Document",
					},
					{
						name: "Compressed (zipped) Folder",
					},
				],
			},
			{
				type: "hr",
			},
			{
				name: "Display settings",
				icon: "display",
				type: "svg",
				action: "SETTINGS",
				payload: "full",
			},
			{
				name: "Personalize",
				icon: "personalize",
				type: "svg",
				action: "SETTINGS",
				payload: "full",
			},
			{
				type: "hr",
			},
			{
				name: "Next desktop background",
				action: "WALLNEXT",
			},
			{
				name: "Open in Terminal",
				icon: "terminal",
				action: "OPENTERM",
				payload: "C:\\Users\\Blue\\Desktop",
			},
			{
				name: "About",
				action: "DESKABOUT",
				icon: "win/info",
				payload: true,
			},
		],
	},
};

export const menusSlice = createSlice({
	name: "menus",
	initialState,
	reducers: {
		hide: (state) => {
			state.hide = true;
		},
		show: (state, action: PayloadAction<MenuPayload>) => {
			state.hide = false;
			state.left = action.payload.left || 430;
			state.top = action.payload.top || 272;
			state.opts = action.payload.menu || MenuType.desk;
		},
	},
});

export const { hide, show } = menusSlice.actions;
export const selectMenus = (state: RootState) => state.menus;

export default menusSlice.reducer;
