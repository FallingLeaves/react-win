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
}

const initialState: FileStore = {
	cdir: "%user%",
	hist: [],
	hid: 0,
	view: 1,
	data: new Bin(),
};

initialState.hist.push(initialState.cdir);
initialState.data.parse(fileData);

console.log(initialState);

export const fileSlice = createSlice({
	name: "files",
	initialState,
	reducers: {},
});

export const selectFiles = (state: RootState) => state.files;

export default fileSlice.reducer;
