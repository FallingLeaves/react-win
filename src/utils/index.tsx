import icons from "./apps";

const TASKBAR_KEY = "__taskbar__";

const taskbar: string[] = (localStorage.getItem(TASKBAR_KEY) &&
	JSON.parse(localStorage.getItem(TASKBAR_KEY) as string)) || [
	"Settings",
	"File Explorer",
	"Browser",
	"Store",
	"Spotify",
];

export const taskApps = icons.filter((v) => taskbar.includes(v.name));
