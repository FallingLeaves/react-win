import React, { useState, useEffect } from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";
import { MenuOpt, hide } from "@/store/menus";
import * as Actions from "@/actions";

interface Action {
	[key: string]: Function;
}

interface Pos {
	left: number;
	right?: number;
	top?: number;
	bottom?: number;
}

export const ActMenu = () => {
	const menu = useAppSelector((state) => state.menus);
	const dispatch = useAppDispatch();
	const menudate = menu.data[menu.opts];
	const { abpos, isLeft } = useAppSelector((state) => {
		const menu = state.menus;
		let acount = menu.menus[menu.opts].length;
		let tmpos: Pos = {
			top: menu.top,
			left: menu.left,
		};
		let tmpleft = false;
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;
		let ewidth = 312;
		let eheight = acount * 28;
		tmpleft = winWidth - tmpos.left > 504;
		if (winWidth - tmpos.left < ewidth) {
			tmpos.left = winWidth - ewidth;
		}
		if (typeof tmpos.top === "number") {
			if (winHeight - tmpos.top < eheight) {
				tmpos.bottom = winHeight - tmpos.top;
				delete tmpos.top;
			}
		}

		return {
			abpos: tmpos,
			isLeft: tmpleft,
		};
	});

	const clickDispatch = (e: React.MouseEvent, opt: MenuOpt) => {
		e.stopPropagation();
		// const target = e.target as HTMLElement;
		// const action = {
		// 	type: target.dataset.action,
		// 	payload: target.dataset.payload,
		// };
		if (typeof opt.action === "string") {
			if (opt.action !== opt.action.toUpperCase()) {
				const fn = (Actions as Action)[opt.action as string];
				fn && fn(opt.payload, menu);
			}
			dispatch(hide());
		}
	};

	const menuObj = (data: MenuOpt[]) => {
		let mnode: JSX.Element[] = [];
		data.map((opt, index) => {
			if (opt.type === "hr") {
				mnode.push(<div key={index} className="menu-hr"></div>);
			} else {
				mnode.push(
					<div
						key={index}
						className="menu-opt"
						onClick={(e) => clickDispatch(e, opt)}
						data-action={opt.action}
						data-payload={opt.payload}
					>
						{menudate.ispace ? (
							<div className="space-content">
								{opt.icon && opt.type === "svg" ? (
									<Icon icon={opt.icon} width={16}></Icon>
								) : null}
								{opt.icon && opt.type === "fa" ? (
									<Icon fafa={opt.icon} width={16}></Icon>
								) : null}
								{opt.icon && !opt.type ? (
									<Icon src={opt.icon} width={16}></Icon>
								) : null}
							</div>
						) : null}
						<div className="nopt">{opt.name}</div>
						{opt.opts ? (
							<Icon
								className="micon right-icon"
								fafa="faChevronRight"
								width={10}
								color="#999"
							></Icon>
						) : null}
						{opt.dot ? (
							<Icon
								className="micon dot-icon"
								fafa="faCircle"
								width={4}
								height={4}
							></Icon>
						) : null}
						{opt.check ? (
							<Icon
								className="micon check-icon"
								fafa="faCheck"
								width={8}
								height={8}
							></Icon>
						) : null}
						{opt.opts ? (
							<div className="mini-menu" style={{ minWidth: menudate.secwid }}>
								{menuObj(opt.opts)}
							</div>
						) : null}
					</div>
				);
			}
		});

		return mnode;
	};

	return (
		<div
			className="act-menu"
			style={{ ...abpos, width: menudate.width }}
			data-hide={menu.hide}
			data-left={isLeft}
		>
			{menuObj(menu.menus[menu.opts])}
		</div>
	);
};

export default ActMenu;
