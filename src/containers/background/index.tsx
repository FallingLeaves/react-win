import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";

import "./index.scss";

export const Background = () => {
	const wallpaper = useAppSelector((state) => state.wallpaper);
	return (
		<div
			className="background"
			style={{
				backgroundImage: `url(img/wallpaper/${wallpaper.src})`,
			}}
		></div>
	);
};
