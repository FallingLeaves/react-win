import React, { useRef, useState, RefObject } from "react";
import "./index.scss";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

interface ImageProps {
	width?: number;
	height?: number;
	lazy?: boolean;
	src: string;
	className?: string;
	id?: string;
	background?: string;
	click?: string;
	dir?: string;
	ext?: boolean;
	free?: boolean;
	onClick?: React.MouseEventHandler;
}

export const Image = (props: ImageProps) => {
	const imgContent = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	let src = `img/${(props.dir ? props.dir + "/" : "") + props.src}.png`;
	if (props.ext != null) {
		src = props.src;
	}

	const clickDispatch = (e: React.MouseEvent) => {};

	useIntersectionObserver({
		target: imgContent,
		onIntersect: ([{ isIntersecting }], observerElement) => {
			if (isIntersecting) {
				setVisible(true);
				observerElement.unobserve(imgContent.current!);
			}
		},
	});

	return (
		<div
			className={`image-content ${props.className || ""}`}
			id={props.id}
			style={{
				backgroundImage: props.background && `url(${props.background})`,
			}}
			onClick={props.onClick || (props.click && clickDispatch) || undefined}
			data-background={props.background ? true : false}
			ref={imgContent}
		>
			{visible ? (
				<img src={src} alt="" data-free={props.free ? true : false} />
			) : null}
		</div>
	);
};
