import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import merge from "lodash/merge";
import { Draft } from "immer";

import type { RootState } from "./index";

export type MenuType = "desk" | "task" | "app";

const CHANGE_SIZE_ACTION = "changeIconSize";
const CHANGE_SORT_ACTION = "changeSort";
const CHANGE_TASK_ALIGN_ACTION = "changeTaskAlign";
const CHANGE_TASK_SEARCH_ACTION = "changeTaskSearch";
const CHANGE_TASK_WIDGET_ACTION = "changeTaskWidget";

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
						action: CHANGE_SIZE_ACTION,
						payload: "large",
						dot: false,
					},
					{
						name: "Medium icons",
						action: CHANGE_SIZE_ACTION,
						payload: "medium",
						dot: false,
					},
					{
						name: "Small icons",
						action: CHANGE_SIZE_ACTION,
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
						action: CHANGE_SORT_ACTION,
						payload: "name",
						dot: false,
					},
					{
						name: "Size",
						action: CHANGE_SORT_ACTION,
						payload: "size",
						dot: false,
					},
					{
						name: "Date modified",
						action: CHANGE_SORT_ACTION,
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
				action: "wallnext",
			},
			{
				name: "Open in Terminal",
				icon: "terminal",
				action: "openTerminal",
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
						action: CHANGE_TASK_ALIGN_ACTION,
						payload: "left",
						dot: false,
					},
					{
						name: "Center",
						action: CHANGE_TASK_ALIGN_ACTION,
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
						action: CHANGE_TASK_SEARCH_ACTION,
						payload: true,
						dot: true,
					},
					{
						name: "Hide",
						action: CHANGE_TASK_SEARCH_ACTION,
						payload: false,
						dot: false,
					},
				],
			},
			{
				name: "Widgets",
				opts: [
					{
						name: "Show",
						action: CHANGE_TASK_WIDGET_ACTION,
						payload: true,
						dot: true,
					},
					{
						name: "Hide",
						action: CHANGE_TASK_WIDGET_ACTION,
						payload: false,
						dot: false,
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
		changeViewSize: (state, action: PayloadAction<string>) => {
			let opts = state.menus.desk[0].opts as Draft<MenuOpt>[];
			for (let index = 0; index < opts.length; index++) {
				let item = opts[index];
				if (item.action === CHANGE_SIZE_ACTION) {
					item.dot = false;
					if (item.payload === action.payload) {
						item.dot = true;
					}
				}
			}
		},
		changeViewSortBy: (state, action: PayloadAction<string>) => {
			let opts = state.menus.desk[1].opts as Draft<MenuOpt>[];
			for (let index = 0; index < opts.length; index++) {
				let item = opts[index];
				if (item.action === CHANGE_SORT_ACTION) {
					item.dot = false;
					if (item.payload === action.payload) {
						item.dot = true;
					}
				}
			}
		},
		toggleViewIconVisible: (state) => {
			let viewOpts = state.menus.desk[0].opts as Draft<MenuOpt>[];
			viewOpts[4].check = !viewOpts[4].check;
		},
		changeTaskAlignWay: (state, action: PayloadAction<string>) => {
			let opts = state.menus.task[0].opts as Draft<MenuOpt>[];
			for (let index = 0; index < opts.length; index++) {
				let item = opts[index];
				if (item.action === CHANGE_TASK_ALIGN_ACTION) {
					item.dot = false;
					if (item.payload === action.payload) {
						item.dot = true;
					}
				}
			}
		},
		toggleTaskSearch: (state, action: PayloadAction<boolean>) => {
			let opts = state.menus.task[2].opts as Draft<MenuOpt>[];
			for (let index = 0; index < opts.length; index++) {
				let item = opts[index];
				if (item.action === CHANGE_TASK_SEARCH_ACTION) {
					item.dot = false;
					if (item.payload === action.payload) {
						item.dot = true;
					}
				}
			}
		},
		toggleTaskWidget: (state, action: PayloadAction<boolean>) => {
			let opts = state.menus.task[3].opts as Draft<MenuOpt>[];
			for (let index = 0; index < opts.length; index++) {
				let item = opts[index];
				if (item.action === CHANGE_TASK_WIDGET_ACTION) {
					item.dot = false;
					if (item.payload === action.payload) {
						item.dot = true;
					}
				}
			}
		},
	},
});

export const {
	hide,
	show,
	changeMenu,
	changeViewSize,
	changeViewSortBy,
	toggleViewIconVisible,
	changeTaskAlignWay,
	toggleTaskSearch,
	toggleTaskWidget,
} = menusSlice.actions;
export const selectMenus = (state: RootState) => state.menus;

export default menusSlice.reducer;
