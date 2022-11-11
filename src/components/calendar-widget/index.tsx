import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";
import Calendar from "../calendar";
import "./index.scss";

export const CalendarWid = () => {
	const sidepane = useAppSelector((state) => state.sidepane);
	const [expend, setExpend] = useState("");

	const toggleCollapse = () => {
		expend === "" ? setExpend("expend") : setExpend("");
	};

	return (
		<div className={`calendar-pane ${expend}`} data-hide={sidepane.calhide}>
			<div className="top-bar pl-4 text-sm flex justify-between items-center">
				<div className="date">
					{new Date().toLocaleDateString(undefined, {
						weekday: "long",
						month: "long",
						day: "numeric",
					})}
				</div>
				<div className="collapser p-2 m-4 rounded" onClick={toggleCollapse}>
					{expend === "" ? (
						<Icon fafa="faChevronDown" />
					) : (
						<Icon fafa="faChevronUp" />
					)}
				</div>
			</div>
			<div className="calendar-wrapper">
				<Calendar weekLabelIndex={0}></Calendar>
			</div>
		</div>
	);
};
