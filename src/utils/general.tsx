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
import { changeAppSize } from "@/actions";

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
  type?: string;
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
    console.log(props);
    if (props.type === "app") {
      changeAppSize({
        app: props.click as string,
        type: props.payload as string,
      });
    }
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

interface ToolbarProps {
  app: string;
  icon: string;
  size: string;
  name: string;
  float?: boolean;
  noinvert?: boolean;
  invert?: boolean;
  bg?: string;
  type?: string;
}

export const Toolbar = (props: ToolbarProps) => {
  const [snap, setSnap] = useState(false);

  const toolClick = () => {
    changeAppSize({
      type: "front",
      app: props.app,
    });
  };

  let posStart = [0, 0];
  let winApp: HTMLElement;
  // 判断toolbar顶部还是边
  let op = 0;
  let direction = [0, 0];
  let posParent = [0, 0];
  let dimParent = [0, 0];

  const toolDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    posStart = [e.clientX, e.clientY];
    const target = e.currentTarget as HTMLElement;
    op = parseInt(target.dataset.op!);
    if (op === 0) {
      winApp = target.parentElement! && target.parentElement.parentElement!;
    } else {
      direction = target.dataset.vec!.split(",").map(Number);
      winApp =
        target.parentElement! &&
        target.parentElement.parentElement! &&
        target.parentElement.parentElement.parentElement!;
    }

    if (winApp) {
      winApp.classList.add("notrans");
      winApp.classList.add("z9900");
      posParent = [winApp.offsetLeft, winApp.offsetTop];
      dimParent = [
        parseFloat(getComputedStyle(winApp).width),
        parseFloat(getComputedStyle(winApp).height),
      ];
    }

    document.addEventListener("mouseup", closeDrag);
    document.addEventListener("mousemove", eleDrag);
  };

  const closeDrag = (e: globalThis.MouseEvent) => {
    winApp.classList.remove("notrans");
    winApp.classList.remove("z9900");
    document.removeEventListener("mousemove", eleDrag);
    document.removeEventListener("mouseup", closeDrag);
    const style = getComputedStyle(winApp);
    const payload = {
      app: props.app,
      type: "resize",
      dim: {
        width: style.width,
        height: style.height,
        top: style.top,
        left: style.left,
      },
    };
    changeAppSize(payload);
  };

  const eleDrag = (e: globalThis.MouseEvent) => {
    e.preventDefault();
    let posX = posParent[0] + e.clientX - posStart[0];
    let posY = posParent[1] + e.clientY - posStart[1];
    let dimW = dimParent[0] + direction[0] * (e.clientX - posStart[0]);
    let dimH = dimParent[1] + direction[1] * (e.clientY - posStart[1]);
    if (op === 0) {
      setPos(posX, posY);
    } else {
      dimW = Math.max(dimW, 320);
      dimH = Math.max(dimH, 320);
      posX = posParent[0] + Math.min(direction[0], 0) * (dimW - dimParent[0]);
      posY = posParent[1] + Math.min(direction[1], 0) * (dimH - dimParent[1]);
      setPos(posX, posY);
      setDim(dimW, dimH);
    }
  };

  const setPos = (left: number, top: number) => {
    winApp.style.left = left + "px";
    winApp.style.top = top + "px";
  };

  const setDim = (width: number, height: number) => {
    winApp.style.width = width + "px";
    winApp.style.height = height + "px";
  };

  return (
    <>
      <div
        className="toolbar"
        data-float={props.float ? true : false}
        data-noinvert={props.noinvert ? true : false}
        style={{ background: props.bg }}
      >
        <div
          className="top-info flex flex-grow items-center"
          data-float={props.float ? true : false}
          data-op="0"
          onClick={toolClick}
          onMouseDown={toolDrag}
        >
          <Icon src={props.icon} width={14}></Icon>
          <div
            className="app-fullname text-xss"
            data-white={props.invert ? true : false}
          >
            {props.name}
          </div>
        </div>
        <div className="action-btns flex items-center">
          <Icon
            invert={props.invert}
            payload="mnmz"
            pr
            src="minimize"
            ui
            width={12}
            click={props.app}
            type={props.type}
          ></Icon>
          <div className="snapbox h-full" data-hv={snap}>
            <Icon
              invert={props.invert}
              click={props.app}
              ui
              pr
              width={12}
              payload="mxmz"
              src={props.size === "full" ? "maximize" : "maxmin"}
              type={props.type}
            ></Icon>
          </div>
          <Icon
            className="close-btn"
            invert={props.invert}
            click={props.app}
            payload="close"
            ui
            width={14}
            pr
            src="close"
            type={props.type}
          ></Icon>
        </div>
      </div>
      <div className="resize-content topone">
        <div className="flex">
          <div
            className="conrsz cursor-nw-resize"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="-1,-1"
          ></div>
          <div
            className="edgrsz cursor-n-resize wdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="0,-1"
          ></div>
        </div>
      </div>
      <div className="resize-content bottomone">
        <div className="flex">
          <div
            className="conrsz cursor-ne-resize"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="-1,1"
          ></div>
          <div
            className="edgrsz cursor-n-resize wdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="0,1"
          ></div>
          <div
            className="conrsz cursor-nw-resize"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,1"
          ></div>
        </div>
      </div>
      <div className="resize-content leftone">
        <div className="h-full">
          <div
            className="edgrsz cursor-w-resize hdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="-1,0"
          ></div>
        </div>
      </div>
      <div className="resize-content rightone">
        <div className="h-full">
          <div
            className="edgrsz cursor-w-resize hdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,0"
          ></div>
        </div>
      </div>
    </>
  );
};
