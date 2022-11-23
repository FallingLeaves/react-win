import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Toolbar } from "@/utils/general";
import "./index.scss";

export const Terminal = () => {
  const termial = useAppSelector((state) => state.apps.terminal);
  const [stack, setStack] = useState<string[]>([
    "OS [Version 10.0.22000.51]",
    "",
  ]);
  const [wnTitle, setWnTitle] = useState<string>("Terminal");

  return (
    <div
      className="terminal window"
      data-size={termial.size}
      data-max={termial.max}
      style={{
        ...(termial.size === "cstm" ? termial.dim : null),
        zIndex: termial.z,
      }}
      data-hide={termial.hide}
      id={termial.icon + "App"}
    >
      <Toolbar
        app={termial.action as string}
        icon={termial.icon}
        size={termial.size}
        name={wnTitle}
        invert
        bg="#060606"
        type="app"
      ></Toolbar>
    </div>
  );
};
