import store from "@/store";
import { changeSize, changeSort as desktopSort } from "@/store/desktop";
import { MenusState, MenuOpt, changeMenu } from "@/store/menus";

import cloneDeep from "lodash/cloneDeep";

export const changeIconSize = (size: string, menu: MenusState) => {
	let tempMenu = cloneDeep(menu);

	(tempMenu.menus.desk[0].opts as MenuOpt[])[0].dot = false;
	(tempMenu.menus.desk[0].opts as MenuOpt[])[1].dot = false;
	(tempMenu.menus.desk[0].opts as MenuOpt[])[2].dot = false;

	let currentSize = 1;
	if (size === "large") {
		currentSize = 1.5;
		(tempMenu.menus.desk[0].opts as MenuOpt[])[0].dot = true;
	} else if (size === "medium") {
		currentSize = 1.2;
		(tempMenu.menus.desk[0].opts as MenuOpt[])[1].dot = true;
	} else {
		currentSize = 1;
		(tempMenu.menus.desk[0].opts as MenuOpt[])[2].dot = true;
	}

	store.dispatch(changeSize(currentSize));
	store.dispatch(changeMenu(tempMenu));
};

export const changeSort = (sortBy: string, menu: MenusState) => {
	let tempMenu = cloneDeep(menu);

	(tempMenu.menus.desk[1].opts as MenuOpt[])[0].dot = false;
	(tempMenu.menus.desk[1].opts as MenuOpt[])[1].dot = false;
	(tempMenu.menus.desk[1].opts as MenuOpt[])[2].dot = false;

	if (sortBy === "name") {
		(tempMenu.menus.desk[1].opts as MenuOpt[])[0].dot = true;
	} else if (sortBy === "size") {
		(tempMenu.menus.desk[1].opts as MenuOpt[])[1].dot = true;
	} else {
		(tempMenu.menus.desk[1].opts as MenuOpt[])[2].dot = true;
	}

	store.dispatch(changeMenu(tempMenu));
	store.dispatch(desktopSort(sortBy));
};
