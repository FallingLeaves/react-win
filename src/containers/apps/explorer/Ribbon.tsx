import React from "react";
import { Icon } from "@/utils/general";
import "./ribbon.scss";

const Ribbon = () => {
	return (
		<div className="ribbon flex">
			<div className="ribbon-item">
				<div className="ribbon-operate flex">
					<Icon src="new" ui width={18} margin="0 6px" />
					<span>New</span>
				</div>
			</div>
			<div className="ribbon-item">
				<Icon src="cut" ui width={18} margin="0 6px" />
				<Icon src="copy" ui width={18} margin="0 6px" />
				<Icon src="paste" ui width={18} margin="0 6px" />
				<Icon src="rename" ui width={18} margin="0 6px" />
			</div>
			<div className="ribbon-item">
				<div className="ribbon-operate flex">
					<Icon src="sort" ui width={18} margin="0 6px" />
					<span>Sort</span>
				</div>
				<div className="ribbon-operate flex">
					<Icon src="view" ui width={18} margin="0 6px" />
					<span>View</span>
				</div>
			</div>
		</div>
	);
};

export default Ribbon;
