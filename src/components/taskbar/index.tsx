import React, { useState, useEffect } from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@/utils/general";
import { Battery } from "@/components/battery";
import { toggleCal, toggleban, togglePane } from "@/store/sidepane";

export function Taskbar() {
  const tasks = useAppSelector((state) => state.taskbar);
  const [time, setTime] = useState(new Date());
  const dispath = useAppDispatch();
  const apps = useAppSelector((state) => {
    var tempApps = { ...state.apps };
    for (let index = 0; index < state.taskbar.apps.length; index++) {
      const element = state.taskbar.apps[index];
      if (tempApps[element.icon]) {
        tempApps[element.icon] = { ...tempApps[element.icon], task: true };
      }
    }
    return tempApps;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  const dateClick = (e: React.MouseEvent) => {
    dispath(toggleCal());
  };

  const bandClick = (e: React.MouseEvent) => {
    dispath(toggleban());
  };

  const paneClick = (e: React.MouseEvent) => {
    dispath(togglePane());
  };

  return (
    <div className="taskbar">
      <div
        className={`taskbar-content flex items-center ${
          tasks.align === "center" ? "justify-center" : "justify-start"
        }`}
        data-menu="task"
      >
        <div className="taskbar-center flex items-center">
          <Icon
            className="taskbar-icon"
            src="home"
            width={24}
            click="STARTOGG"
          ></Icon>
          {tasks.search ? (
            <Icon
              click="STARTSRC"
              className="taskbar-icon search"
              icon="taskSearch"
            ></Icon>
          ) : null}
          {tasks.widgets ? (
            <Icon
              className={`taskbar-icon widget ${
                tasks.align === "center" ? "widget-left" : ""
              }`}
              src="widget"
              width={24}
              click="WIDGTOGG"
            ></Icon>
          ) : null}
          {tasks.apps.map((task, index) => {
            let isHidden = apps[task.icon].hide;
            let isActive = apps[task.icon].z == apps.hz;
            return (
              <div key={index} data-value={task.icon}>
                <Icon
                  className="taskbar-icon"
                  width={24}
                  click={task.action}
                  payload="toggle"
                  src={task.icon}
                  type={task.type}
                  open={isHidden ? false : true}
                  active={isActive}
                ></Icon>
              </div>
            );
          })}
          {Object.keys(apps).map((key, index) => {
            let isActive = false;
            if (key !== "hz") {
              isActive = apps[key].z === apps.hz;
            }
            return key !== "hz" && !apps[key].task && !apps[key].hide ? (
              <div key={index} data-value={apps[key].icon}>
                <Icon
                  className="taskbar-icon"
                  width={24}
                  active={isActive}
                  click={apps[key].action}
                  open
                  src={apps[key].icon}
                  type={apps[key].type}
                  payload="toggle"
                ></Icon>
              </div>
            ) : null;
          })}
        </div>
        <div className="taskbar-right flex">
          <div
            className="px-2 flex handcr prtclk hvlight"
            data-action="BANDTOGG"
            onClick={bandClick}
          >
            <Icon fafa="faChevronUp" width={10}></Icon>
          </div>
          <div
            className="prtckl handcr my-1 px-1 flex hvlight"
            data-action="PANETOGG"
            onClick={paneClick}
          >
            <Icon className="task-icon" src="wifi" ui width={16}></Icon>
            <Icon
              className="task-icon"
              src={`audio${tasks.audio}`}
              ui
              width={16}
            ></Icon>
            <Battery></Battery>
          </div>
          <div
            className="task-date m-1 handcr prtclk hvlight"
            data-action="CALNTOGG"
            onClick={dateClick}
          >
            <div>
              {time.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <div>
              {time.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "numeric",
              })}
            </div>
          </div>
          <Icon className="graybd my-4" ui width={6} click="SHOWDSK" pr></Icon>
        </div>
      </div>
    </div>
  );
}
