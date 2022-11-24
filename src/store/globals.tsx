import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./index";

export interface LayItem {
  dim: {
    width: string | number;
    height: string | number;
    left: string | number;
    top: string | number;
  };
  br: number;
}

type Lay = [
  [LayItem, LayItem],
  [LayItem, LayItem],
  [LayItem, LayItem, LayItem],
  [LayItem, LayItem, LayItem],
  [LayItem, LayItem, LayItem, LayItem],
  [LayItem, LayItem, LayItem]
];

interface Globals {
  lays: Lay;
}

const initialState: Globals = {
  lays: [
    [
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: "50%",
        },
        br: 15,
      },
    ],
    [
      {
        dim: {
          width: "66%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "34%",
          height: "100%",
          top: 0,
          left: "66%",
        },
        br: 15,
      },
    ],
    [
      {
        dim: {
          width: "33%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "34%",
          height: "100%",
          top: 0,
          left: "33%",
        },
        br: 1,
      },
      {
        dim: {
          width: "33%",
          height: "100%",
          top: 0,
          left: "67%",
        },
        br: 15,
      },
    ],
    [
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: 0,
          left: "50%",
        },
        br: 3,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: "50%",
          left: "50%",
        },
        br: 5,
      },
    ],
    [
      {
        dim: {
          width: "50%",
          height: "50%",
          top: 0,
          left: 0,
        },
        br: 2,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: 0,
          left: "50%",
        },
        br: 3,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: "50%",
          left: 0,
        },
        br: 7,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: "50%",
          left: "50%",
        },
        br: 5,
      },
    ],
    [
      {
        dim: {
          width: "25%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: "25%",
        },
        br: 1,
      },
      {
        dim: {
          width: "25%",
          height: "100%",
          top: 0,
          left: "75%",
        },
        br: 15,
      },
    ],
  ],
};

export const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {},
});

export const selectGlobals = (state: RootState) => state.globals;

export default globalsSlice.reducer;
