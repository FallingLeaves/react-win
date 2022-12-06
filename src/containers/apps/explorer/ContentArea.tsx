import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Image } from "@/components/image";
import "./contentArea.scss";

interface Props {
	searchtxt: string;
}

const ContentArea = ({ searchtxt }: Props) => {
	const files = useAppSelector((state) => state.files);
	const [selected, setSelect] = useState(null);
	const fdata = files.data.getId(files.cdir);

	return (
		<div className="content-area">
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
