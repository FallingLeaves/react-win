import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import merge from "lodash/merge";

import type { RootState } from "./index";

export type MenuType = "desk" | "task" | "app";

export interface MenuOpt {
	name?: string;
	action?: string;
	payload?: string | boolean;
	dot?: boolean;
	check?: boolean;
	dsb?: boolean;
	type?: string;
	icon?: string;
	opts?: MenuOpt[];
}

interface MenuStyle {
	width: string;
	secwid: string;
	ispace?: boolean;
}

export interface MenusState {
	hide: boolean;
	top: number;
	left: number;
	opts: MenuType;
	data: { [key in MenuType]: MenuStyle };
	menus: { [key in MenuType]: MenuOpt[] };
}

export interface MenuPayload {
	top?: number;
	left?: number;
	menu?: MenuType;
}

const initialState: MenusState = {
	hide: true,
	top: 0,
	left: 0,
	opts: "desk",
	data: {
		desk: {
			width: "310px",
			secwid: "200px",
			ispace: true,
		},
		task: {
			width: "220px",
			secwid: "120px",
			ispace: false,
		},
		app: {
			width: "310px",
			secwid: "200px",
			ispace: true,
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
						dot: false,
					},
					{
						name: "Medium icons",
						action: "changeIconSize",
						payload: "medium",
						dot: false,
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
						dot: false,
					},
					{
						name: "Size",
						action: "changeSort",
						payload: "size",
						dot: false,
					},
					{
						name: "Date modified",
						action: "changeSort",
						payload: "date",
						dot: false,
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
		task: [
			{
				name: "Align icons",
				opts: [
					{
						name: "Left",
						action: "changeTaskAlign",
						payload: "left",
					},
					{
						name: "Center",
						action: "changeTaskAlign",
						payload: "center",
						dot: true,
					},
				],
			},
			{
				type: "hr",
			},
			{
				name: "Search",
				opts: [
					{
						name: "Show",
						action: "TASKSRCH",
						payload: true,
					},
					{
						name: "Hide",
						action: "TASKSRCH",
						payload: false,
					},
				],
			},
			{
				name: "Widgets",
				opts: [
					{
						name: "Show",
						action: "TASKWIDG",
						payload: true,
					},
					{
						name: "Hide",
						action: "TASKWIDG",
						payload: false,
					},
				],
			},
			{
				type: "hr",
			},
			{
				name: "Show Desktop",
				action: "SHOWDSK",
			},
		],
		app: [
			{
				name: "Open",
				action: "performApp",
				payload: "open",
			},
			{
				name: "Run as administrator",
				action: "performApp",
				payload: "open",
				icon: "win/shield",
			},
			{
				name: "Open file location",
				dsb: true,
			},
			{
				name: "Unpin from start",
				dsb: true,
			},
			{
				name: "Compress to Zip file",
				dsb: true,
			},
			{
				name: "Copy as path",
				dsb: true,
			},
			{
				name: "Properties",
				dsb: true,
			},
			{
				type: "hr",
			},
			{
				name: "Delete shortcut",
				action: "performApp",
				payload: "delshort",
			},
			{
				name: "Delete",
				action: "delApp",
				payload: "delete",
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
			state.opts = action.payload.menu || "desk";
		},
		changeMenu: (state, action: PayloadAction<MenusState>) => {
			state = merge(state, action.payload);
		},
	},
});

export const { hide, show, changeMenu } = menusSlice.actions;
export const selectMenus = (state: RootState) => state.menus;

export default menusSlice.reducer;
