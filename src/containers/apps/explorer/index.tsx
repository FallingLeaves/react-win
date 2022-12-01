import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Toolbar } from "@/utils/general";
import "./index.scss";
import Ribbon from "./Ribbon";

export const Explorer = () => {
	const explorer = useAppSelector((state) => state.apps.explorer);

	return (
		<div
			className="explorer window"
			data-size={explorer.size}
			data-max={explorer.max}
			style={{
				...(explorer.size === "cstm" ? explorer.dim : null),
				zIndex: explorer.z,
			}}
			data-hide={explorer.hide}
			id={explorer.icon + "App"}
		>
			<Toolbar
				app={explorer.action as string}
				icon={explorer.icon}
				size={explorer.size}
				name="File Explorer"
				type="app"
			></Toolbar>
			<div className="window-screen flex flex-col">
				<Ribbon></Ribbon>
			</div>
		</div>
	);
};
