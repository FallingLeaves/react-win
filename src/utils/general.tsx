import React, {
	useState,
	useEffect,
	MouseEventHandler,
	MouseEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./general.scss";

import type {
	IconDefinition,
	IconName,
} from "@fortawesome/fontawesome-common-types";
import * as FaIcons from "@fortawesome/free-solid-svg-icons";
import * as FaRegIcons from "@fortawesome/free-regular-svg-icons";
import * as AllIcons from "./icon";

interface IconProps {
	ui?: boolean;
	src?: string;
	ext?: boolean;
	onClick?: MouseEventHandler;
	pr?: boolean;
	fafa?: string;
	icon?: string;
	className?: string;
	click?: string;
	payload?: string;
	menu?: string;
	reg?: boolean;
	flip?: boolean;
	invert?: boolean;
	rounded?: boolean;
	width?: number;
	height?: number;
	color?: string;
	margin?: string;
	open?: boolean;
	active?: boolean;
}

export const Icon = (props: IconProps) => {
	let src = `img/icon/${props.ui ? "ui/" : ""}${props.src}.png`;
	if (props.ext || (props.src && props.src.includes("http"))) {
		src = props.src as string;
	}
	let prtclk = "";
	if (props.src) {
		if (props.onClick || props.pr) {
			prtclk = "prtclk";
		}
	}

	const clickDispatch = (event: MouseEvent) => {
		console.log(event, props);
	};

	if (props.fafa) {
		const icon = props.reg
			? (FaRegIcons as unknown as Record<string, IconDefinition>)[props.fafa]
			: (FaIcons as unknown as Record<string, IconDefinition>)[props.fafa];
		return (
			<div
				className={`uicon prtclk ${props.className || ""}`}
				onClick={props.onClick || (props.click && clickDispatch) || undefined}
				data-action={props.click}
				data-payload={props.payload}
				data-menu={props.menu}
			>
				<FontAwesomeIcon
					icon={icon}
					data-flip={props.flip}
					data-invert={props.invert ? "true" : "false"}
					data-rounded={props.rounded ? "true" : "false"}
					style={{
						width: props.width,
						height: props.height || props.width,
						color: props.color,
						margin: props.margin,
					}}
				></FontAwesomeIcon>
			</div>
		);
	} else if (props.icon) {
		const CustomIcon = (
			AllIcons as unknown as Record<
				string,
				(
					props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
				) => JSX.Element
			>
		)[props.icon];
		return (
			<div
				className={`uicon prtclk ${props.className || ""}`}
				onClick={props.onClick || (props.click && clickDispatch) || undefined}
				data-action={props.click}
				data-payload={props.payload}
				data-menu={props.menu}
			>
				<CustomIcon
					data-flip={props.flip}
					data-invert={props.invert ? "true" : "false"}
					data-rounded={props.rounded ? "true" : "false"}
					style={{
						width: props.width,
						height: props.height || props.width,
						color: props.color,
						margin: props.margin,
					}}
				></CustomIcon>
			</div>
		);
	} else {
		return (
			<div
				className={`uicon ${props.className || ""} ${prtclk}`}
				data-open={props.open}
				data-action={props.click}
				data-active={props.active}
				data-payload={props.payload}
				onClick={props.onClick || (props.pr && clickDispatch) || undefined}
				data-menu={props.menu}
				data-pr={props.pr}
			>
				{props.className === "taskbar-icon" ? (
					<div
						onClick={props.click ? clickDispatch : undefined}
						style={{ width: props.width, height: props.width }}
						data-action={props.click}
						data-payload={props.payload}
						data-click={props.click}
						data-flip={props.flip}
						data-invert={props.invert ? "true" : "false"}
						data-rounded={props.rounded ? "true" : "false"}
					>
						<img
							width={props.width}
							height={props.height}
							data-action={props.click}
							data-payload={props.payload}
							data-click={props.click}
							data-flip={props.flip}
							data-invert={props.invert ? "true" : "false"}
							data-rounded={props.rounded ? "true" : "false"}
							src={src}
							style={{
								margin: props.margin,
							}}
							alt=""
						/>
					</div>
				) : (
					<img
						width={props.width}
						height={props.height}
						onClick={props.click ? clickDispatch : undefined}
						data-action={props.click}
						data-payload={props.payload}
						data-click={props.click}
						data-flip={props.flip}
						data-invert={props.invert ? "true" : "false"}
						data-rounded={props.rounded ? "true" : "false"}
						src={props.src ? src : undefined}
						style={{
							margin: props.margin,
						}}
						alt=""
					/>
				)}
			</div>
		);
	}
};
