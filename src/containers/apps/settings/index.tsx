import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Toolbar } from "@/utils/general";
import "./index.scss";
import data from "../assets/seetingsData.json";

interface Tile {
  type: string;
  name?: string;
  desc?: string;
  icon?: string;
}

export const Settings = () => {
  const settings = useAppSelector((state) => state.apps.settings);
  const userName = useAppSelector((state) => state.settings.person.name);
  const wall = useAppSelector((state) => state.wallpaper);
  const [nav, setNav] = useState("");
  const [page, setPage] = useState("System"); // default System

  return (
    <div
      className="settings window"
      data-size={settings.size}
      data-max={settings.max}
      data-hidden={settings.hide}
      style={{
        ...(settings.size === "cstm" ? settings.dim : null),
        zIndex: settings.z,
      }}
      id={settings.icon + "App"}
    >
      <Toolbar
        app={settings.action!}
        icon={settings.icon}
        size={settings.size}
        name="Settings"
        type="app"
      ></Toolbar>
      <div className="window-screen flex flex-col">
        <div className="reset-window flex-grow flex flex-col">
          <nav className={nav}>
            <div className="nav-top">
              <div className="account">
                <img
                  src="img/settings/defAccount.webp"
                  alt=""
                  height={60}
                  width={60}
                />
                <div>
                  <p>{userName}</p>
                  <p>Local Account</p>
                </div>
              </div>
              <input
                type="text"
                className="search"
                placeholder="Find a setting "
                name="search"
              />
            </div>
            <div className="nav-bottom win-scroll">
              {Object.keys(data).map((item) => {
                return (
                  <div
                    key={item}
                    className={`nav-link ${item === page ? "selected" : ""}`}
                    onClick={() => setPage(item)}
                  >
                    <img
                      src={`img/settings/${item}.webp`}
                      alt=""
                      height={16}
                      width={16}
                    />
                    {item}
                  </div>
                );
              })}
              <div className="marker"></div>
            </div>
          </nav>
          {Object.keys(data).map((item) => {
            return page === item ? (
              <main key={item}>
                <h1>{item}</h1>
                <div className="tiles-content win-scroll">
                  {(data as { [key: string]: Tile[] })[item].map((v, i) => {
                    switch (v.type) {
                      case "sysTop":
                        return (
                          <div key={i} className="sysTop">
                            <div className="left">
                              <img
                                src={`img/wallpaper/${wall.src}`}
                                alt=""
                                className="device-img"
                              />
                              <div className="device-column">
                                <p className="device-name">Liber-V</p>
                                <p className="device-model">NS14A8</p>
                                <p className="device-rename">Rename</p>
                              </div>
                            </div>
                            <div className="right">
                              <div className="column">
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg"
                                  height={20}
                                  alt=""
                                />
                                <p>
                                  Microsoft 365
                                  <br />
                                  <span className="column-lower">
                                    View benefits
                                  </span>
                                </p>
                              </div>
                              <div
                                className="column"
                                onClick={() => setPage("Windows Update")}
                              >
                                <img
                                  src="img/settings/Windows Update.webp"
                                  alt=""
                                  height={20}
                                />
                                <p>
                                  Windows Update
                                  <br />
                                  <span className="column-lower">
                                    You're up to date
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      case "netTop":
                        return (
                          <div key={i} className="netTop">
                            <div>
                              <img
                                src="img/settings/wifi.png"
                                alt=""
                                height={100}
                              />
                              <div>
                                <h2 className="font-medium text-lg">WiFi</h2>
                                <p>Connected, secured</p>
                              </div>
                            </div>
                            <div className="box">
                              <span className="settings-icon"></span>
                              <div>
                                <h3>Properties</h3>
                                <p>Public network 5 Ghz</p>
                              </div>
                            </div>
                            <div className="box">
                              <span className="settings-icon"></span>
                              <div>
                                <h3>Data Usage</h3>
                                <p>
                                  {Math.round(Math.random() * 100)}GB, last 30
                                  days
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      case "personaliseTop":
                        return (
                          <div key={i} className="personaliseTop">
                            <img
                              className="main-img"
                              src={`img/wallpaper/${wall.src}`}
                              alt=""
                            />
                            <div>
                              <h3>Select a theme to apply</h3>
                              <div className="bg-box"></div>
                            </div>
                          </div>
                        );
                      case "tile":
                      case "tile square":
                      case "tile thin-blue":
                        return (
                          <div key={v.name} className={v.type}>
                            <span className="settings-icon">{v.icon}</span>
                            <div>
                              <p>{v.name}</p>
                              <p className="tile-desc">{v.desc}</p>
                            </div>
                          </div>
                        );
                      default:
                        break;
                    }
                  })}
                </div>
              </main>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};