import React from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";

export function Bandpane() {
	const sidepane = useAppSelector((state) => state.sidepane);

	return (
		<div className="bandpane" data-hide={sidepane.banhide}>
			<div className="band-wrapper">
				<Icon className="hvlight" src="defender" width={17}></Icon>
				<Icon className="hvlight" src="spotify" width={17}></Icon>
				<Icon className="hvlight" src="teams" width={17}></Icon>
			</div>
		</div>
	);
}
