import { Item } from "@/utils/bin";
import { Icon } from "@/utils/general";
import React from "react";
import "./dirContent.scss";

interface Props {
	fdata: Item | null;
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const DirContent = (props: Props) => {
	let arr = [];
	let curr = props.fdata;
	let index = 0;

	while (curr) {
		arr.push(
			<div key={index++} className="dir-content flex items-center">
				<div
					className="dncontent"
					onClick={props.onClick}
					data-action="FILEDIR"
					data-payload={curr.id}
					tabIndex={-1}
				>
					{curr.name}
				</div>
				<Icon className="dirchev" fafa="faChevronRight" width={8}></Icon>
			</div>
		);

		curr = curr.host;
	}

	arr.push(
		<div key={index++} className="dir-content flex items-center">
			<div className="dncontent">This PC</div>
			<Icon className="dirchev" fafa="faChevronRight" width={8}></Icon>
		</div>
	);

	arr.push(
		<div key={index++} className="dir-content flex items-center">
			<Icon
				className="pr-1 pb-px"
				src={`win/${props.fdata?.info.icon}-sm`}
				width={16}
			></Icon>
			<Icon className="dirchev" fafa="faChevronRight" width={8}></Icon>
		</div>
	);

	return (
		<div className="dirfbox h-full flex" key={index++}>
			{arr.reverse()}
		</div>
	);
};

export default DirContent;
