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
      changeAppSize(props.payload as string, props.click as string);
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
    </>
  );
};
