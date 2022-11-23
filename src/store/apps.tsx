import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";
import { allApps } from "@/utils";
import { AppItem } from "@/utils/apps";

let dev = "";
if (import.meta.env.MODE === "development") {
	dev = "";
}

interface AppStatus extends AppItem {
	size: string;
	hide: boolean;
	z: number;
	max: boolean;
	dir?: string;
}

type ObjType<T extends readonly string[]> = {
  [K in T[number]]: AppStatus
}

const appicons = allApps.map((v) => v.icon) as const;
type Keys = typeof appicons[number];

const initialState: ObjType<typeof appicons> & { hz?: number } = {};

for (let index = 0; index < allApps.length; index++) {
	const app = allApps[index];
	initialState[app.icon] = Object.assign({}, app, {
		size: "full",
		hide: true,
		max: false,
		z: 0,
	});
	if (app.icon === dev) {
		initialState[app.icon]!.size = "mini";
		initialState[app.icon]!.hide = false;
		initialState[app.icon]!.max = true;
		initialState[app.icon]!.z = 1;
	}
}
initialState.hz = 2;

export const appsSlice = createSlice({
	name: "apps",
	initialState,
	reducers: {
		operTerminal: (state, action: PayloadAction<string>) => {
			state.terminal!.size = "full";
			state.terminal!.hide = false;
			state.terminal!.max = true;
			state.hz! += 1;
			state.terminal!.z = state.hz!;
			state.terminal!.dir = action.payload;
		},
	},
});

export const { operTerminal } = appsSlice.actions;
export const selectApps = (state: RootState) => state.apps;

export default appsSlice.reducer;
