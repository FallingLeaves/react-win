import React from "react";
import { Icon } from "@/utils/general";
import "./navTitle.scss";
import { fileDir } from "@/store/files";
import { useAppDispatch, useAppSelector } from "@/hooks";

interface Props {
	icon?: string;
	action?: string | null;
	payload: string;
	title: string;
	isize?: number;
}

const NavTitle = (props: Props) => {
	const src = props.icon || "folder";
	const dispatch = useAppDispatch();

	const foldClick = (e: React.MouseEvent) => {
		// console.log(props.action, props.payload);
		if (props.payload) {
			dispatch(fileDir(props.payload));
		}
	};

	return (
		<div
			className="navtitle flex prtclk"
			data-action={props.action}
			data-payload={props.payload}
			onClick={foldClick}
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
