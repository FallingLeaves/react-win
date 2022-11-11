import React, { useMemo } from "react";
import CalendarHeader from "./Header";
import CalendarBody from "./Body";
import { initObserver } from "@/utils/calendar";
import { Subject } from "@/utils/subject";
import "./index.scss";

export default ({ weekLabelIndex = 1 }: { weekLabelIndex: number }) => {
	// let calendarObserver: Subject = initObserver();
	let calendarObserver = useMemo<Subject>(() => {
		return initObserver();
	}, []);

	return (
		<div className="calendar-content">
			<CalendarHeader observer={calendarObserver}></CalendarHeader>
			<CalendarBody
				observer={calendarObserver}
				weekLabelIndex={weekLabelIndex}
			></CalendarBody>
		</div>
	);
};
