import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon, Toolbar } from "@/utils/general";
import "./index.scss";
import Ribbon from "./Ribbon";
import DirContent from "./DirContent";
import NavPane from "./NavPane";

export const Explorer = () => {
	const explorer = useAppSelector((state) => state.apps.explorer);
	const files = useAppSelector((state) => state.files);
	const fdata = files.data.getId(files.cdir);
	const [cpath, setPath] = useState(files.cpath);
	const [searchtxt, setSearch] = useState("");

	const changHandle = (e: React.ChangeEvent) => {};

	const enterHandle = (e: React.KeyboardEvent) => {};

	const dispathAction = (e: React.MouseEvent) => {};

	const searchChangeHandle = (e: React.ChangeEvent) => {};

	useEffect(() => {
		setPath(files.cpath);
		setSearch("");
	}, [files.cpath]);

	return (
		<div
			className="explorer window"
			data-size={explorer.size}
			data-max={explorer.max}
			style={{
				...(explorer.size === "cstm" ? explorer.dim : null),
				zIndex: explorer.z,
			}}
			data-hide={explorer.hide}
			id={explorer.icon + "App"}
		>
			<Toolbar
				app={explorer.action as string}
				icon={explorer.icon}
				size={explorer.size}
				name="File Explorer"
				type="app"
			></Toolbar>
			<div className="window-screen flex flex-col">
				<Ribbon></Ribbon>
				<div className="reset-window flex-grow flex flex-col">
					<div className="file-top-tools">
						<Icon
							className={`nav-icon hvtheme ${
								files.hid === 0 ? "disabled" : ""
							}`}
							fafa="faArrowLeft"
							width={14}
							click="FILEPREV"
							pr
						></Icon>
						<Icon
							className={`nav-icon hvtheme ${
								files.hid + 1 === files.hist.length ? "disabled" : ""
							}`}
							fafa="faArrowRight"
							width={14}
							click="FILENEXT"
							pr
						></Icon>
						<Icon
							className="nav-icon hvtheme"
							fafa="faArrowUp"
							width={14}
							click="FILEBACK"
							pr
						></Icon>
						<div className="path-bar noscroll">
							<input
								type="text"
								className="path-field"
								value={cpath}
								onChange={changHandle}
								onKeyDown={enterHandle}
							/>
							<DirContent fdata={fdata} onClick={dispathAction}></DirContent>
						</div>
						<div className="search-bar">
							<Icon className="search-icon" src="search" width={12}></Icon>
							<input
								type="text"
								value={searchtxt}
								onChange={searchChangeHandle}
								placeholder="Search"
							/>
						</div>
					</div>
					<div className="file-mid-content">
						<NavPane></NavPane>
					</div>
					<div className="file-footer">
						<div className="item-count text-xs">{fdata?.data.length} items</div>
						<div className="view-opts flex">
							<Icon
								className="view-icon hvtheme p-1"
								click="FILEVIEW"
								payload="5"
								open={files.view === 5}
								src="win/viewinfo"
								width={16}
							></Icon>
							<Icon
								className="view-icon hvtheme p-1"
								click="FILEVIEW"
								payload="1"
								open={files.view === 1}
								src="win/viewinfo"
								width={16}
							></Icon>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
