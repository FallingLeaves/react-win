import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import fileData from "./dir.json";
import { Bin } from "@/utils/bin";

interface FileStore {
	cdir: string;
	hist: string[];
	hid: number;
	view: number;
	data: Bin;
	cpath: string;
	[key: number]: string;
}

const initialState: FileStore = {
	cdir: "%user%",
	hist: [],
	hid: 0,
	view: 1,
	data: new Bin(),
	cpath: "",
};

let navHist: boolean = false;

initialState.hist.push(initialState.cdir);
initialState.data.parse(fileData);
initialState.cpath = initialState.data.getPath(initialState.cdir);
fileHandle(initialState);

// console.log(initialState);
function fileHandle(state: FileStore) {
	if (!navHist && state.cdir != state.hist[state.hid]) {
		state.hist.splice(state.hid + 1);
		state.hist.push(state.cdir);
		state.hid = state.hist.length - 1;
	}
	state.cdir = state.hist[state.hid];
	if (state.cdir.includes("%")) {
		if (state.data.special[state.cdir]) {
			state.cdir = state.data.special[state.cdir];
			state[state.hid] = state.cdir;
		}
	}
	state.cpath = state.data.getPath(state.cdir);
}

export const fileSlice = createSlice({
	name: "files",
	initialState,
	reducers: {
		fileDir: (state, action: PayloadAction<string>) => {
			state.cdir = action.payload;
			fileHandle(state);
		},
		filePath: (state, action: PayloadAction<string>) => {
			let pathId = state.data.parsePath(action.payload);
			if (pathId) {
				state.cdir = pathId;
			}
			fileHandle(state);
		},
		fileBack: (state) => {
			let item = state.data.getId(state.cdir);
			if (item?.host) {
				state.cdir = item.host.id;
			}
			fileHandle(state);
		},
		fileView: (state, action: PayloadAction<number | string>) => {
			state.view = +action.payload;
		},
		filePrev: (state) => {
			state.hid--;
			if (state.hid < 0) {
				state.hid = 0;
			}
			navHist = true;
			fileHandle(state);
		},
		fileNext: (state) => {
			state.hid++;
			if (state.hid > state.hist.length - 1) {
				state.hid = state.hist.length - 1;
			}
			navHist = true;
			fileHandle(state);
		},
	},
});

export const { fileDir, filePath, fileBack, fileView, fileNext, filePrev } =
	fileSlice.actions;
export const selectFiles = (state: RootState) => state.files;

export default fileSlice.reducer;
