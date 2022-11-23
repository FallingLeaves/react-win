import store from "@/store";
import {
  changeSize,
  changeSort as desktopSort,
  SortType,
  hide as desktopHide,
  show as desktopShow,
  toggle as desktopToggle,
} from "@/store/desktop";
import {
  MenusState,
  MenuOpt,
  changeMenu,
  changeViewSize,
  changeViewSortBy,
  toggleViewIconVisible,
  changeTaskAlignWay,
  toggleTaskSearch,
  toggleTaskWidget,
} from "@/store/menus";
import { next as wallpaperNext } from "@/store/wallpaper";
import {
  toggle as taskAlignToggle,
  changeSearch,
  changeWidget,
} from "@/store/taskbar";
import {
  wifiToggle,
  bluetoothToggle,
  airplaneToggle,
  saverToggle,
  setTheme,
  nightlightToggle,
} from "@/store/settings";
import { setThemeSrc } from "@/store/sidepane";
import {
  openTerminal as openWinTerminal,
  changeAppStatus,
  AppStatusPayload,
} from "@/store/apps";

import cloneDeep from "lodash/cloneDeep";

export const changeIconSize = (size: string) => {
  let currentSize = 1;
  if (size === "large") {
    currentSize = 1.5;
  } else if (size === "medium") {
    currentSize = 1.2;
  } else {
    currentSize = 1;
  }

  store.dispatch(changeSize(currentSize));
  store.dispatch(changeViewSize(size));
};

export const changeSort = (sortBy: SortType) => {
  store.dispatch(changeViewSortBy(sortBy));
  store.dispatch(desktopSort(sortBy));
};

export const deskHide = (payload?: string) => {
  store.dispatch(desktopToggle());
  store.dispatch(toggleViewIconVisible());
};

export const refresh = (payload?: string) => {
  const tempMenu = store.getState().menus;
  if ((tempMenu.menus.desk[0].opts as MenuOpt[])[4].check) {
    store.dispatch(desktopHide());
    setTimeout(() => {
      store.dispatch(desktopShow());
    }, 100);
  }
};

export const wallnext = (payload?: string) => {
  store.dispatch(wallpaperNext());
};

export const changeTaskAlign = (payload: string) => {
  store.dispatch(taskAlignToggle());
  store.dispatch(changeTaskAlignWay(payload));
};

export const changeTaskSearch = (payload: boolean) => {
  store.dispatch(changeSearch(payload));
  store.dispatch(toggleTaskSearch(payload));
};

export const changeTaskWidget = (payload: boolean) => {
  store.dispatch(changeWidget(payload));
  store.dispatch(toggleTaskWidget(payload));
};

export const toggleWifi = () => {
  store.dispatch(wifiToggle());
};

export const toggleBluetooth = () => {
  store.dispatch(bluetoothToggle());
};

export const toggleAirplane = () => {
  store.dispatch(airplaneToggle());
};

export const toggleSaver = () => {
  store.dispatch(saverToggle());
};

export const toggleNightlight = () => {
  store.dispatch(nightlightToggle());
};

export const changeTheme = (payload: string) => {
  let thm = store.getState().settings.person.theme;
  thm = thm == "light" ? "dark" : "light";
  let icon = thm == "light" ? "sun" : "moon";
  store.dispatch(setThemeSrc(icon));
  store.dispatch(setTheme(thm));
};

export const openTerminal = (payload: string) => {
  store.dispatch(openWinTerminal());
};

export const changeAppSize = (payload: string, click: string) => {
  // console.log(payload, click);
  store.dispatch(changeAppStatus({ app: click, size: payload }));
};
