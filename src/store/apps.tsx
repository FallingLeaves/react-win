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
  dim?: any;
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
  size: string;
  app: string;
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
      const { size, app } = action.payload;
      const keys = Object.keys(state);
      for (let index = 0; index < keys.length; index++) {
        let item = state[keys[index]];
        if (item.action === app) {
          if (size === "full") {
            item.size = "full";
            item.hide = false;
            item.max = true;
            state.hz! += 1;
            item.z = state.hz!;
          } else if (size === "close") {
            item.hide = true;
            item.max = false;
            item.z = -1;
            state.hz! -= 1;
          } else if (size === "mxmz") {
            item.size = ["mini", "full"][item.size !== "full" ? 1 : 0];
            item.hide = false;
            item.max = true;
            state.hz! += 1;
            item.z = state.hz!;
          } else if (size === "toggle") {
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
          } else if (size === "mnmz") {
            item.max = false;
            item.hide = false;
            if (item.z === state.hz) {
              state.hz -= 1;
            }
            item.z = -1;
          }
        }
      }
    },
  },
});

export const { openTerminal, changeAppStatus } = appsSlice.actions;
export const selectApps = (state: RootState) => state.apps;

export default appsSlice.reducer;
