import React from "react";
import "./navPane.scss";
import Dropdown from "./Dropdown";

const NavPane = () => {
	return (
		<div className="nav-pane win-scroll">
			<div className="extcontent">
				<Dropdown icon="star" title="Quick access" action="" isDropped>
					<Dropdown
						icon="down"
						title="Downloads"
						spid="%downloads%"
						notoggle
						pinned
					></Dropdown>
					<Dropdown
						icon="user"
						title="Blue"
						spid="%user%"
						notoggle
						pinned
					></Dropdown>
					<Dropdown
						icon="docs"
						title="Documents"
						spid="%documents%"
						notoggle
						pinned
					></Dropdown>
					<Dropdown title="Github" spid="%github%" notoggle></Dropdown>
					<Dropdown
						icon="pics"
						title="Pictures"
						spid="%pictures%"
						notoggle
					></Dropdown>
				</Dropdown>
				<Dropdown icon="onedrive" title="OneDrive" spid="%onedrive%"></Dropdown>
				<Dropdown icon="thispc" title="This PC" action="" isDropped>
					<Dropdown icon="desk" title="Desktop" spid="%desktop%"></Dropdown>
					<Dropdown icon="docs" title="Documents" spid="%documents%"></Dropdown>
					<Dropdown icon="down" title="Downloads" spid="%downloads%"></Dropdown>
					<Dropdown icon="music" title="Music" spid="%music%"></Dropdown>
					<Dropdown icon="pics" title="Pictures" spid="%pictures%"></Dropdown>
					<Dropdown icon="vid" title="Videos" spid="%videos%"></Dropdown>
					<Dropdown icon="disc" title="OS (C:)" spid="%cdrive%"></Dropdown>
					<Dropdown icon="disk" title="Blue (D:)" spid="%ddrive%"></Dropdown>
				</Dropdown>
			</div>
		</div>
	);
};

export default NavPane;
