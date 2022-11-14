import React, { useState, useEffect } from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";

export const Desktop = () => {
	const deskApps = useAppSelector((state) => {
		let res = { ...state.desktop };
		let tmpApps = [...res.apps];

		if (res.sort === "name") {
			tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
		} else if (res.sort === "size") {
			tmpApps.sort((a, b) => {
				let aname = a.name;
				let bname = b.name;
				return aname[bname.charCodeAt(0) % aname.length] >
					bname[aname.charCodeAt(0) % bname.length]
					? 1
					: -1;
			});
		} else if (res.sort === "date") {
			tmpApps.sort((a, b) => {
				let anm = a.name;
				let bnm = b.name;
				let anml = anm.length;
				let bnml = bnm.length;
				return anm[(bnml * 13) % anm.length] > bnm[(anml * 17) % bnm.length]
					? 1
					: -1;
			});
		}
		res.apps = tmpApps;
		return res;
	});

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
