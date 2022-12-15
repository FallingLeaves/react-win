import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import "./App.scss";
// import { Counter } from "./Counter";

import { Background } from "./containers/background";
import { Taskbar } from "@/components/taskbar";
import { Desktop } from "@/components/desktop";
import { CalendarWid } from "@/components/calendar-widget";
import ActMenu from "./components/menu";
import { Bandpane } from "@/components/bandpane";
import { Sidepane } from "@/components/sidepane";
import { StartMenu } from "@/containers/apps/startmenu";
import * as Applications from "@/containers/apps";

interface Application {
	[key: string]: any;
}

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
	MenuPayload,
	show as menuShow,
	hide as menuHide,
	MenuType,
} from "@/store/menus";
import { useEffect } from "react";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
}

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.addEventListener("click", afterMath);
		window.addEventListener("contextmenu", contextMenuClick);
		return () => {
			window.removeEventListener("click", afterMath);
			window.removeEventListener("contextmenu", contextMenuClick);
		};
	}, []);

	const afterMath = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const ess = [
			["START", "startmenu/startHide"],
			["BAND", "sidepane/banHide"],
			["PANE", "sidepane/paneHide"],
			["CALN", "sidepane/hideCal"],
			["MENU", "menus/hide"],
		];
		const type = getComputedStyle(target).getPropertyValue("--prefix").trim();
		const action = target.dataset.action || "";
		// console.log(e, "window", type, action);
		ess.forEach((item) => {
			if (!action.startsWith(item[0]) && !type.startsWith(item[0])) {
				dispatch({ type: item[1] });
			}
		});
	};

	const contextMenuClick = (e: MouseEvent) => {
		afterMath(e);
		e.preventDefault();
		// console.log(e);
		let data: MenuPayload = {
			left: e.clientX,
			top: e.clientY,
		};
		const target = e.target as HTMLElement;
		if (target.dataset.menu) {
			data.menu = target.dataset.menu as MenuType;
			dispatch(menuShow(data));
		}
	};

	return (
		<div className="App">
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				{/* <Counter></Counter> */}
				<div className="appwrap">
					<Background />
					<Taskbar />
					<ActMenu />
					<div className="desktop" data-menu="desk">
						<Desktop />
						{Object.keys(Applications).map((key, index) => {
							const WinApp = (Applications as Application)[key];
							return <WinApp key={index}></WinApp>;
						})}
						<CalendarWid />
						<Bandpane />
						<Sidepane />
						<StartMenu />
					</div>
				</div>
			</ErrorBoundary>
		</div>
	);
}

export default App;
