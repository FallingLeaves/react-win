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
} from "@/store/menus";

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
