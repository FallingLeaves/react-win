import React, { useState } from "react";
import { Icon } from "@/utils/general";
import { useAppDispatch, useAppSelector } from "@/hooks";
import "./dropdown.scss";
import NavTitle from "./NavTitle";

interface Props {
	isDropped?: boolean;
	spid: string;
	notoggle: boolean;
	icon: string;
	title: string;
	isize: number;
	action: string;
	pinned?: boolean;
	dir: string;
}

const Dropdown = (props: Props) => {
	const [open, setOpen] = useState(props.isDropped);
	const special = useAppSelector((state) => state.files.data.special);
	const [fid, setFid] = useState(() => {
		if (props.spid) {
			return special[props.spid];
		}
		return props.dir;
	});
	const toggle = () => setOpen(!open);

	return (
		<div className="dropdown-menu">
			<div className="drop-title">
				{!props.notoggle ? (
					<Icon
						className="arrow-ui"
						fafa={open ? "faChevronDown" : "faChevronRight"}
						width={10}
						onClick={toggle}
						pr
					></Icon>
				) : (
					<Icon
						className="arrow-ui opacity-0"
						fafa="faCircle"
						width={10}
					></Icon>
				)}
				<NavTitle
					icon={props.icon}
					title={props.title}
					isize={props.isize}
					action={props.action ? props.action || "FILEDIR" : null}
					payload={fid}
				></NavTitle>
				{props.pinned ? (
					<Icon className="pin-ui" src="win/pinned" width={16}></Icon>
				) : null}
			</div>
		</div>
	);
};

export default Dropdown;
