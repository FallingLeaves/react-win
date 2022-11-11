import { Subject } from "./subject";

let transfer = function (date: Date, fmt: string) {
	let o: {
		[k: string]: string | number;
	} = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		S: date.getMilliseconds(),
	};

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substring(4 - RegExp.$1.length)
		);
	}
	for (const key in o) {
		if (new RegExp("(" + key + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1
					? o[key] + ""
					: ("00" + o[key]).substring(("" + o[key]).length)
			);
		}
	}

	return fmt;
};

export const dateFormat = function (
	timeSpan: Date,
	fmt: string,
	formatDateNullValue?: string
) {
	if (!timeSpan) {
		if (formatDateNullValue) {
			return formatDateNullValue;
		}
		return "无";
	}

	let date = new Date(timeSpan);
	return transfer(date, fmt);
};

export const getHeaderContent = function (date: Date) {
	let _date = new Date(date);
	return dateFormat(_date, "yyyy年 MM月");
};

/**
 * 获取当月的第一天
 * @param date
 * @returns
 */
export const getFirstDayOfMonth = function (date: Date) {
	let _date = new Date(date);
	_date.setDate(1);
	return _date;
};

export const getFirstDayOfCalendar = function (
	date: Date,
	weekLabelIndex: number
) {
	let _date = new Date(date);
	_date = new Date(
		_date.setDate(_date.getDate() - _date.getDay() + weekLabelIndex)
	);
	if (_date > date) {
		_date = new Date(_date.setDate(_date.getDate() - 7));
	}
	return _date;
};

export const getWeekLabelList = function (weekIndexOfFirstWeekDay: number) {
	let weekLabelArray: string[] = [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
	];

	for (let index = 0; index < weekIndexOfFirstWeekDay; index++) {
		let weekLabel = weekLabelArray.shift() || "";
		weekLabelArray.push(weekLabel);
	}

	return weekLabelArray;
};

export const formatDayWithTwoWords = function (dateNumber: number) {
	if (dateNumber < 10) {
		return "0" + dateNumber;
	}
	return dateNumber;
};

export const isCurrentMonth = function (firstDayOfMonth: Date, date: Date) {
	return firstDayOfMonth.getMonth() === date.getMonth();
};

export const isCurrentDay = function (date: Date) {
	let _date = new Date();
	return (
		date.getFullYear() === _date.getFullYear() &&
		date.getMonth() === _date.getMonth() &&
		date.getDate() === _date.getDate()
	);
};

export const getFirstDayOfNextMonth = function (firstDayOfCurrentMonth: Date) {
	return new Date(
		firstDayOfCurrentMonth.getFullYear(),
		firstDayOfCurrentMonth.getMonth() + 1,
		1
	);
};

export const getFirstDayOfPrevMonth = function (firstDayOfCurrentMonth: Date) {
	return new Date(
		firstDayOfCurrentMonth.getFullYear(),
		firstDayOfCurrentMonth.getMonth() - 1,
		1
	);
};

export const initObserver = function () {
	let subject = new Subject();
	return subject;
};
