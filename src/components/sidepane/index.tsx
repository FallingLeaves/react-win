import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";
import { setAudio } from "@/store/taskbar";
import { setBrightness as setBrightnessValue } from "@/store/settings";
import * as Actions from "@/actions";
import { QuickItem } from "@/store/sidepane";

interface Action {
	[key: string]: Function;
}

export function Sidepane() {
	const sidepane = useAppSelector((state) => state.sidepane);
	const settings = useAppSelector((state) => state.settings);
	const taskbar = useAppSelector((state) => state.taskbar);
	const [paneState, setPaneState] = useState<boolean[]>([]);
	const dispatch = useAppDispatch();
	const volumeSlider = useRef<HTMLInputElement>(null);
	const brightnessSlider = useRef<HTMLInputElement>(null);

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

	function silderBackground(elem: HTMLElement, e: number) {
		elem.style.setProperty(
			"--track-color",
			`linear-gradient(90deg, var(--clrPrm) ${e - 9}%, #888888 ${e}%)`
		);
	}

	const setBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const value = +target.value;
		document.getElementById("brightoverlay")!.style.opacity =
			(100 - value) / 100 + "";
		dispatch(setBrightnessValue(value));
		silderBackground(brightnessSlider.current!, value);
	};

	const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const value = +target.value;
		let aud = 3;
		if (value < 70) {
			aud = 2;
		}
		if (value < 30) {
			aud = 1;
		}
		if (value === 0) {
			aud = 0;
		}
		dispatch(setAudio(aud));
		silderBackground(volumeSlider.current!, value);
	};

	const clickDispatch = (e: React.MouseEvent, item: QuickItem) => {
		if (item.action !== item.action.toUpperCase()) {
			const fn = (Actions as Action)[item.action];
			fn && fn();
		}
	};

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
									onClick={(e) => clickDispatch(e, item)}
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
						ref={brightnessSlider}
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
						ref={volumeSlider}
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
