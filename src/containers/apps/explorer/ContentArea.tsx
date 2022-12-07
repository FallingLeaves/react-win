import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Image } from "@/components/image";
import { fileDir } from "@/store/files";
import "./contentArea.scss";

interface Props {
	searchtxt: string;
}

const ContentArea = ({ searchtxt }: Props) => {
	const files = useAppSelector((state) => state.files);
	const [selected, setSelect] = useState("");
	const fdata = files.data.getId(files.cdir);
	const dispatch = useAppDispatch();

	const clickHandle = (e: React.MouseEvent) => {
		e.stopPropagation();
		const target = e.target as HTMLDivElement;
		const id = target.dataset.id;
		setSelect(id!);
	};

	const doubleClickHandle = (e: React.MouseEvent) => {
		e.stopPropagation();
		const target = e.target as HTMLDivElement;
		const id = target.dataset.id;
		const item = files.data.getId(id!);
		if (item) {
			if (item.type === "folder") {
				dispatch(fileDir(item.id));
			}
		}
	};

	const emptyClick = (e: React.MouseEvent) => {
		setSelect("");
	};

	return (
		<div className="content-area" tabIndex={-1} onClick={emptyClick}>
			<div className="content-wrapper win-scroll">
				<div className="grid-show" data-size="lg">
					{fdata?.data.map((item, i) => {
						return (
							item.name.includes(searchtxt) && (
								<div
									key={i}
									className="content-icon hvtheme flex flex-col items-center prtclk"
									data-id={item.id}
									data-focus={item.id === selected}
									onDoubleClick={doubleClickHandle}
									onClick={clickHandle}
								>
									<Image src={`icon/win/${item.info.icon}`}></Image>
									<span>{item.name}</span>
								</div>
							)
						);
					})}
				</div>
				{fdata?.data.length === 0 ? (
					<div className="text-xs mx-auto">This folder is empty.</div>
				) : null}
			</div>
		</div>
	);
};

export default ContentArea;
