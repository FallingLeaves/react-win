import React, { useEffect, useState } from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";

export function Sidepane() {
	const sidepane = useAppSelector((state) => state.sidepane);
	const settings = useAppSelector((state) => state.settings);
	const taskbar = useAppSelector((state) => state.taskbar);
	const [paneState, setPaneState] = useState<boolean[]>([]);

	const getTreeValue = (obj: any, path: string) => {
		if (path == null) return false;

		let tdir = { ...obj };
		let pathList = path.split(".");
		for (let i = 0; i < pathList.length; i++) {
			tdir = tdir[pathList[i]];
		}

		return tdir;
	};

	useEffect(() => {
		let tmp = [];
		for (let index = 0; index < sidepane.quicks.length; index++) {
			const item = sidepane.quicks[index];
			let val = getTreeValue(settings, item.state);
			if (item.name === "Theme") {
				val = val === "dark";
			}
			tmp.push(val);
		}
		setPaneState(tmp);
	}, [settings, sidepane]);

	const setBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {};
	const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {};

	return (
		<div className="sidepane" data-hide={sidepane.hide}>
			<div className="quick-settings p-5 pb-8">
				<div className="quick-content flex flex-wrap justify-between">
					{sidepane.quicks.map((item, index) => {
						return (
							<div
								key={index}
								className="quick-group flex flex-col items-center"
							>
								<div
									className="quick-btn handcr prtclk flex justify-center items-center"
									data-action={item.action}
									data-payload={item.state}
									data-state={paneState[index]}
								>
									<Icon
										ui={item.ui}
										src={item.src}
										width={14}
										invert={paneState[index]}
									></Icon>
								</div>
								<div className="quick-text">{item.name}</div>
							</div>
						);
					})}
				</div>
				<div className="slider-content">
					<Icon className="mx-2" src="brightness" ui width={20}></Icon>
					<input
						type="range"
						className="sliders brightness-slider"
						min={10}
						max={100}
						defaultValue={100}
						onChange={setBrightness}
					/>
				</div>
				<div className="slider-content">
					<Icon
						className="mx-2"
						src={"audio" + taskbar.audio}
						ui
						width={18}
					></Icon>
					<input
						type="range"
						className="sliders volume-slider"
						min={0}
						max={100}
						defaultValue={100}
						onChange={setVolume}
					/>
				</div>
			</div>
		</div>
	);
}
