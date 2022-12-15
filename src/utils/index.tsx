import icons from "./apps";

const TASKBAR_KEY = "__taskbar__";
const DESKTOP_KEY = "__desktop__";
const PINNED_KEY = "__pinned__";
const RECENT_KEY = "__recent__";

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

const pinned: string[] = (localStorage.getItem(PINNED_KEY) &&
	JSON.parse(localStorage.getItem(PINNED_KEY) as string)) || [
	"Browser",
	"Get Started",
	"Task Manager",
	"Mail",
	"Settings",
	"Store",
	"Unescape",
	"Buy me a coffee",
	"Notepad",
	"Whiteboard",
	"Calculator",
	"Spotify",
	"Twitter",
	"File Explorer",
	"Terminal",
	"Github",
	"Discord",
	"Camera",
];

const recent: string[] = (localStorage.getItem(RECENT_KEY) &&
	JSON.parse(localStorage.getItem(RECENT_KEY) as string)) || [
	"Mail",
	"Twitter",
	"Terminal",
	"Github",
	"File Explorer",
	"Spotify",
	"Edge",
];

export const taskApps = icons.filter((v) => taskbar.includes(v.name));

export const desktopApps = icons
	.filter((v) => desktop.includes(v.name))
	.sort((a, b) => {
		return desktop.indexOf(a.name) > desktop.indexOf(b.name) ? 1 : -1;
	});

export const allApps = icons.filter((app) => app.type === "app");

export const pinnedApps = icons
	.filter((app) => pinned.includes(app.name))
	.sort((a, b) => {
		return pinned.indexOf(a.name) > pinned.indexOf(b.name) ? 1 : -1;
	});

export const recentApps = icons
	.filter((app) => recent.includes(app.name))
	.sort((a, b) => {
		return recent.indexOf(a.name) > recent.indexOf(b.name) ? 1 : -1;
	});
