import React from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";

export function Taskbar() {
	const tasks = useAppSelector((state) => state.taskbar);

	return (
		<div className="taskbar">
			<div className="taskbar-content flex items-center justify-between">
				<div className="taskbar-left">
					{tasks.widgets ? (
						<Icon
							className="taskbar-icon widget"
							src="widget"
							width={24}
							click="WIDGTOGG"
						></Icon>
					) : null}
				</div>
				<div className="taskbar-center flex items-center">
					<Icon
						className="taskbar-icon"
						src="home"
						width={24}
						click="STARTOGG"
					></Icon>
					{tasks.search ? (
						<Icon
							click="STARTSRC"
							className="taskbar-icon search"
							icon="taskSearch"
						></Icon>
					) : null}
					{tasks.apps.map((task, index) => {
						return (
							<div key={index} data-value={task.icon}>
								<Icon
									className="taskbar-icon"
									width={24}
									click={task.action}
									payload="togg"
									src={task.icon}
								></Icon>
							</div>
						);
					})}
				</div>
				<div className="taskbar-right flex">
					<div className="px-2 flex handcr prtclk" data-action="BANDTOGG">
						<Icon fafa="faChevronUp" width={10}></Icon>
					</div>
					<div className="prtckl handcr my-1 px-1 flex" data-action="PANETOGG">
						<Icon className="task-icon" src="wifi" ui width={16}></Icon>
						<Icon
							className="task-icon"
							src={`audio${tasks.audio}`}
							ui
							width={16}
						></Icon>
					</div>
					<div className="task-date m-1 handcr prtclk" data-action="CALNTOGG">
						<div>
							{new Date().toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
							})}
						</div>
						<div>
							{new Date().toLocaleDateString("en-US", {
								year: "2-digit",
								month: "2-digit",
								day: "numeric",
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
