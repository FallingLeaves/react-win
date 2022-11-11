import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import wallpaperReducer from "./wallpaper";
import taskbarReducer from "./taskbar";
import settingsReducer from "./settings";
import desktopReducer from "./desktop";
import sidepaneReducer from "./sidepane";

const store = configureStore({
	reducer: {
		counter: counterReducer,
		wallpaper: wallpaperReducer,
		taskbar: taskbarReducer,
		settings: settingsReducer,
		desktop: desktopReducer,
		sidepane: sidepaneReducer,
	},
});

export default store;

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
