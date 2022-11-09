import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Suspense
			fallback={
				<div id="sus-fallback">
					<h1>Loading</h1>
				</div>
			}
		>
			<Provider store={store}>
				<App />
			</Provider>
		</Suspense>
	</React.StrictMode>
);
