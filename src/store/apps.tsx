import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";
import { allApps } from "@/utils";
import { AppItem } from "@/utils/apps";

let dev = "";
if (import.meta.env.MODE === "development") {
  dev = "";
}

export interface Dim {
  width: string | number;
  height: string | number;
  left: string | number;
  top: string | number;
}

interface AppStatus extends AppItem {
  size: string;
  hide: boolean;
  z: number;
  max: boolean;
  dir?: string;
  dim?: Dim;
}

type ObjType<T extends readonly string[]> = {
  [K in T[number]]: AppStatus;
};

const appicons = allApps.map((v) => v.icon);
type Keys = typeof appicons[number];

// TODO 类型定义有问题
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

export interface AppStatusPayload {
  type: string;
  app: string;
  dim?: Dim;
}

export const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    openTerminal: (state) => {
      state.terminal!.size = "full";
      state.terminal!.hide = false;
      state.terminal!.max = true;
      state.hz! += 1;
      state.terminal!.z = state.hz!;
    },
    changeAppStatus: (state, action: PayloadAction<AppStatusPayload>) => {
      const { type, app, dim } = action.payload;
      const keys = Object.keys(state);
      for (let index = 0; index < keys.length; index++) {
        let item = state[keys[index]];
        if (item.action === app) {
          if (type === "full") {
            item.size = "full";
            item.hide = false;
            item.max = true;
            state.hz! += 1;
            item.z = state.hz!;
          } else if (type === "close") {
            item.hide = true;
            item.max = false;
            item.z = -1;
            state.hz! -= 1;
          } else if (type === "mxmz") {
            item.size = ["mini", "full"][item.size !== "full" ? 1 : 0];
            item.hide = false;
            item.max = true;
            state.hz! += 1;
            item.z = state.hz!;
          } else if (type === "toggle") {
            if (item.z !== state.hz!) {
              item.hide = false;
              if (item.max) {
                item.z = -1;
                item.max = false;
              } else {
                state.hz! += 1;
                item.z = state.hz!;
                item.max = true;
              }
            } else {
              item.max = !item.max;
              item.hide = false;
              if (item.max) {
                state.hz += 1;
                item.z = state.hz;
              } else {
                item.z = -1;
                state.hz -= 1;
              }
            }
          } else if (type === "mnmz") {
            item.max = false;
            item.hide = false;
            if (item.z === state.hz) {
              state.hz -= 1;
            }
            item.z = -1;
          } else if (type === "resize") {
            item.size = "cstm";
            item.hide = false;
            item.max = true;
            if (item.z !== state.hz) {
              state.hz! += 1;
            }
            item.z = state.hz!;
            item.dim = dim;
          } else if (type === "front") {
            item.hide = false;
            item.max = true;
            if (item.z !== state.hz) {
              state.hz! += 1;
              item.z = state.hz!;
            }
          }
        }
      }
    },
  },
});

export const { openTerminal, changeAppStatus } = appsSlice.actions;
export const selectApps = (state: RootState) => state.apps;

export default appsSlice.reducer;
