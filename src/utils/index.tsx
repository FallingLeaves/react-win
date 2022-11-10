import icons from "./apps";

const TASKBAR_KEY = "__taskbar__";
const DESKTOP_KEY = "__desktop__";

const taskbar: string[] = (localStorage.getItem(TASKBAR_KEY) &&
	JSON.parse(localStorage.getItem(TASKBAR_KEY) as string)) || [
	"Settings",
	"File Explorer",
	"Browser",
	"Store",
	"Spotify",
];

const desktop: string[] = (localStorage.getItem(DESKTOP_KEY) &&
	JSON.parse(localStorage.getItem(DESKTOP_KEY) as string)) || [
	"Blue",
	"Unescape",
	"Recycle Bin",
	"File Explorer",
	"Store",
	"Browser",
	"Github",
	"Spotify",
	"Buy me a coffee",
];

export const taskApps = icons.filter((v) => taskbar.includes(v.name));

export const desktopApps = icons
	.filter((v) => desktop.includes(v.name))
	.sort((a, b) => {
		return desktop.indexOf(a.name) > desktop.indexOf(b.name) ? 1 : -1;
	});
