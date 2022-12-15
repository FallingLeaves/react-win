import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import wallpaperReducer from "./wallpaper";
import taskbarReducer from "./taskbar";
import settingsReducer from "./settings";
import desktopReducer from "./desktop";
import sidepaneReducer from "./sidepane";
import menusReducer from "./menus";
import appsReducer from "./apps";
import globalsReducer from "./globals";
import filesReducer from "./files";
import startmenuSlice from "./startmenu";

const store = configureStore({
	reducer: {
		counter: counterReducer,
		wallpaper: wallpaperReducer,
		taskbar: taskbarReducer,
		settings: settingsReducer,
		desktop: desktopReducer,
		sidepane: sidepaneReducer,
		menus: menusReducer,
		apps: appsReducer,
		globals: globalsReducer,
		files: filesReducer,
		startmenu: startmenuSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
