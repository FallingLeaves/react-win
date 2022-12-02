import React from "react";
import { Icon } from "@/utils/general";
import "./navTitle.scss";

interface Props {
	icon?: string;
	action?: string | null;
	payload: string;
	title: string;
	isize?: number;
}

const NavTitle = (props: Props) => {
	const src = props.icon || "folder";

	return (
		<div
			className="navtitle flex prtclk"
			data-action={props.action}
			data-payload={props.payload}
		>
			<Icon
				className="mr-1"
				src={`win/${src}-sm`}
				width={props.isize || 16}
			></Icon>
			<span>{props.title}</span>
		</div>
	);
};

export default NavTitle;
