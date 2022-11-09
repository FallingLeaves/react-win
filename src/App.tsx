import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import "./App.scss";
// import { Counter } from "./Counter";

import { Background } from "./containers/background";
import { Taskbar } from "@/components/taskbar";

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
	return (
		<div className="App">
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				{/* <Counter></Counter> */}
				<div className="appwrap">
					<Background />
					<Taskbar />
				</div>
			</ErrorBoundary>
		</div>
	);
}

export default App;
