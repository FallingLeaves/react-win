import React, { useState, useEffect } from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";

export const Desktop = () => {
	const deskApps = useAppSelector((state) => state.desktop);

	return (
		<div className="desktop-content w-0 h-full flex flex-col flex-wrap">
			{deskApps.hide
				? null
				: deskApps.apps.map((app, index) => {
						return (
							<div
								key={index}
								className="desktop-app flex flex-col items-center justify-center"
								tabIndex={0}
							>
								<Icon
									click={app.action}
									className="desktop-icon prtclk"
									src={app.icon}
									payload={app.payload || "full"}
									pr
									width={Math.round(deskApps.size * 36)}
									menu="app"
								></Icon>
								<div className="app-name">{app.name}</div>
							</div>
						);
				  })}
		</div>
	);
};
