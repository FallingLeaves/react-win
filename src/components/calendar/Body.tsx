import React, { useState, useEffect } from "react";
import { Subject } from "@/utils/subject";
import {
	getFirstDayOfMonth,
	getFirstDayOfCalendar,
	formatDayWithTwoWords,
	isCurrentMonth,
	isCurrentDay,
	getWeekLabelList,
} from "@/utils/calendar";
import "./body.scss";

interface DayItem {
	date: Date;
	monthDay: number | string;
	isCurrentMonth: boolean;
	isCurrentDay: boolean;
}

export default ({
	observer,
	weekLabelIndex = 1,
}: {
	observer: Subject;
	weekLabelIndex?: number;
}) => {
	const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
	const [weekList, setWeekList] = useState<DayItem[][]>([]);
	const [weekLabelArray, setWeekLabelArray] = useState<string[]>([]);

	const update = (content: Date) => {
		setFirstDayOfMonth(content);
		setWeekListValue(content);
	};

	useEffect(() => {
		observer.addObserver({
			update: update,
		});

		setFirstDayOfMonth(getFirstDayOfMonth(new Date()));
		setWeekLabelArray(getWeekLabelList(weekLabelIndex));
		setWeekListValue(getFirstDayOfMonth(new Date()));
	}, []);

	const onClickDay = (dayItem: DayItem) => {};

	const setWeekListValue = (firstDayOfMonth: Date) => {
		let newWeekList = [];
		let dayOfCalendar = getFirstDayOfCalendar(firstDayOfMonth, weekLabelIndex);

		for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
			let weekItem = [];
			for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
				let dayItem: DayItem = {
					date: dayOfCalendar,
					monthDay: formatDayWithTwoWords(dayOfCalendar.getDate()),
					isCurrentMonth: isCurrentMonth(firstDayOfMonth, dayOfCalendar),
					isCurrentDay: isCurrentDay(dayOfCalendar),
				};
				weekItem.push(dayItem);
				dayOfCalendar.setDate(dayOfCalendar.getDate() + 1);
			}
			newWeekList.push(weekItem);
			setWeekList(newWeekList);
		}
	};

	const isShowRedColorForWeekLabel = (index: number) => {
		return (
			index + weekLabelIndex === 6 ||
			index + weekLabelIndex === 7 ||
			(index === 0 && weekLabelIndex === 0)
		);
	};

	return (
		<div className="calendar-body">
			<div className="calendar-body-week-label">
				{weekLabelArray.map((item, index) => {
					return (
						<div
							key={index}
							className={`calendar-body-week-label-day ${
								isShowRedColorForWeekLabel(index) ? "red-font" : ""
							}`}
						>
							<span>{item}</span>
						</div>
					);
				})}
			</div>
			<div className="calendar-body-content">
				{weekList.map((weekItem: DayItem[], index) => {
					return (
						<div className="calendar-body-week" key={index}>
							{weekItem.map((dayItem: DayItem, index: number) => {
								return (
									<div
										key={index}
										className={`calendar-body-week-day ${
											dayItem.isCurrentMonth
												? "calendar-body-current-month"
												: ""
										} ${
											dayItem.isCurrentDay ? "calendar-body-current-day" : ""
										} ${isShowRedColorForWeekLabel(index) ? "red-font" : ""}`}
										onClick={() => onClickDay(dayItem)}
									>
										<span>{dayItem.monthDay}</span>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
