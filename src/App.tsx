import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import "./App.scss";
// import { Counter } from "./Counter";

import { Background } from "./containers/background";
import { Taskbar } from "@/components/taskbar";
import { Desktop } from "@/components/desktop";
import { CalendarWid } from "@/components/calendar-widget";
import ActMenu from "./components/menu";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { MenuPayload, show as menuShow, hide as menuHide } from "@/store/menus";

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

	const winClick = (e: MouseEvent) => {
		// TODO 不是所有的点击都关闭menu
		dispatch(menuHide());
	};

	window.onclick = winClick;

	window.oncontextmenu = function (e: MouseEvent) {
		e.preventDefault();
		// console.log(e);
		let data: MenuPayload = {
			left: e.clientX,
			top: e.clientY,
		};
		const target = e.target as HTMLElement;
		if (target.dataset.menu) {
			data.menu = target.dataset.menu;
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
						<CalendarWid />
					</div>
				</div>
			</ErrorBoundary>
		</div>
	);
}

export default App;
