import React, { useState, useEffect } from "react";
import { Subject } from "@/utils/subject";
import {
	getHeaderContent,
	getFirstDayOfNextMonth,
	getFirstDayOfPrevMonth,
} from "@/utils/calendar";
import { Icon } from "@/utils/general";

import "./header.scss";

export default ({ observer }: { observer: Subject }) => {
	const [headerContent, setHeaderContent] = useState("");
	const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());

	useEffect(() => {
		setHeaderContent(getHeaderContent(new Date()));
		setFirstDayOfMonth(new Date());
	}, []);

	const observerNotify = (currentFirstDayOfMonth: Date) => {
		setHeaderContent(getHeaderContent(currentFirstDayOfMonth));
		observer.notify(currentFirstDayOfMonth);
	};

	const goPrev = () => {
		const preFirstDayOfMonth = getFirstDayOfPrevMonth(firstDayOfMonth);
		setFirstDayOfMonth(preFirstDayOfMonth);
		observerNotify(preFirstDayOfMonth);
	};

	const goNext = () => {
		const nextFirstDayOfMonth = getFirstDayOfNextMonth(firstDayOfMonth);
		setFirstDayOfMonth(nextFirstDayOfMonth);
		observerNotify(nextFirstDayOfMonth);
	};

	return (
		<div className="calendar-header flex justify-between items-center">
			<div className="header-left">{headerContent}</div>
			<div className="header-right flex items-center">
				<div className="mounth-btn handcr" onClick={goPrev}>
					<Icon fafa="faChevronLeft" color="#999" />
				</div>
				<div className="mounth-btn handcr" onClick={goNext}>
					<Icon fafa="faChevronRight" color="#999" />
				</div>
			</div>
		</div>
	);
};
