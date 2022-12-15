import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import "./index.scss";
import { AppStatus } from "@/store/apps";
import { Empty, StartmenuStatus } from "@/store/startmenu";
import { Icon } from "@/utils/general";
import { cloneDeep } from "lodash";
import { AppItem } from "@/utils/apps";

export const StartMenu = () => {
	const { align } = useAppSelector((state) => state.taskbar);
	const start = useAppSelector((state) => {
		let res: StartmenuStatus = cloneDeep(state.startmenu);
		let ln = (6 - (res.pnApps.length % 6)) % 6;
		for (let index = 0; index < ln; index++) {
			(res.pnApps as Empty[]).push({
				empty: true,
			});
		}

		let allApps: AppStatus[][] = [];
		let tmpApps = Object.keys(state.apps)
			.filter((v) => v !== "hz")
			.map((v) => {
				return state.apps[v];
			});

		tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

		for (let i = 0; i < 27; i++) {
			allApps[i] = [];
		}

		for (let index = 0; index < tmpApps.length; index++) {
			const item = tmpApps[index];
			let t1 = item.name.trim().toUpperCase().charCodeAt(0);
			if (t1 > 64 && t1 < 91) {
				allApps[t1 - 64].push(tmpApps[index]);
			} else {
				allApps[0].push(tmpApps[index]);
			}
		}

		res.contApps = allApps;
		res.allApps = tmpApps;

		return res;
	});
	const userName = useAppSelector((state) => state.settings.person.name);

	const clickDispatch = (e: React.MouseEvent) => {
		e.stopPropagation();
		const target = e.target;
		console.log(target);
	};

	return (
		<div
			className="start-menu-content dpshad"
			data-hide={start.hide}
			data-align={align}
		>
			{start.menu ? (
				<>
					<div className="start-menu" data-allapps={start.showAll}>
						<div className="menu-up">
							<div className="pinned-apps">
								<div className="start-bar">
									<div className="gp-name">Pinned</div>
									<div className="gp-btn prtclk" data-action="STARTALL">
										<div>ALL apps</div>
										<Icon fafa="faChevronRight" width={8}></Icon>
									</div>
								</div>
								<div className="pinned-apps-list">
									{start.pnApps.map((app, index) => {
										return (app as Empty).empty ? (
											<div key={index} className="pinned-app empty"></div>
										) : (
											<div
												key={index}
												className="prtclk pinned-app"
												data-action={(app as AppItem).action}
												data-payload={(app as AppItem).payload}
												onClick={clickDispatch}
											>
												<Icon
													className="pinned-icon"
													src={(app as AppItem).icon}
													width={32}
												></Icon>
												<div className="app-name">{(app as AppItem).name}</div>
											</div>
										);
									})}
								</div>
							</div>
							<div className="recommend-apps win-scroll">
								<div className="start-bar">
									<div className="gp-name">Recommended</div>
									<div className="gp-btn none">
										<div>More</div>
										<Icon fafa="faChevronRight"></Icon>
									</div>
								</div>
								<div className="recommend-apps-list">
									{start.rcApps.slice(0, 6).map((app, index) => {
										return app.name ? (
											<div
												key={index}
												className="recomend-app"
												data-action={app.action}
												data-payload={app.payload || "full"}
											>
												<Icon
													className="pinned-icon"
													src={app.icon}
													width={32}
												></Icon>
												<div className="info">
													<div className="app-name">{app.name}</div>
													{/* <div className="time-used">{app.lastUsed}</div> */}
												</div>
											</div>
										) : null;
									})}
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};
