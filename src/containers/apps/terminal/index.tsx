import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Toolbar } from "@/utils/general";
import "./index.scss";
import { changeAppStatus } from "@/store/apps";

export const Terminal = () => {
  const termial = useAppSelector((state) => state.apps.terminal);
  const [stack, setStack] = useState<string[]>([
    "OS [Version 10.0.22000.51]",
    "",
  ]);
  const [wnTitle, setWnTitle] = useState<string>("Terminal");
  const [pwd, setPwd] = useState("C:\\Users\\Blue");
  const cmdline = useRef<HTMLDivElement>(null);
  const cmdContent = useRef<HTMLDivElement>(null);
  const [lastCmd, setLastCmd] = useState(0);
  const dispatch = useAppDispatch();

  const hoverHandle = (e: React.MouseEvent) => {
    if (cmdline.current) {
      const crline = cmdline.current.parentNode as HTMLElement;
      if (crline && cmdContent.current) {
        cmdContent.current.scrollTop = crline.offsetTop;
      }
      cmdline.current.focus();
    }
  };

  const enterHandle = (e: React.KeyboardEvent) => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      let tmpStack = [...stack];
      const target = e.target as HTMLDivElement;
      const cmd = target.innerText.trim();
      target.innerText = "";
      setLastCmd(tmpStack.length + 1);
      cmdTool(cmd);
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      e.preventDefault();
    } else if (key === "Tab") {
      e.preventDefault();
    }
  };

  const colorCode = (color: string) => {
    let code = "#000000";
    /*
			0: Black
			1: Blue
			2: Green
			3: Cyan
			4: Red
			5: Magenta
			6: Brown
			7: Light Gray
			8: Dark Gray
			9: Light Blue
			A: Light Green
			B: Light Cyan
			C: Light Red
			D: Light Magenta
			E: Yellow
			F: White
		*/

    switch (color.toUpperCase()) {
      // case "0":
      //   code = "#000000";
      //   break;
      case "1":
        code = "#0000AA";
        break;
      case "2":
        code = "#00AA00";
        break;
      case "3":
        code = "#00AAAA";
        break;
      case "4":
        code = "#AA0000";
        break;
      case "5":
        code = "#AA00AA";
        break;
      case "6":
        code = "#AA5500";
        break;
      case "7":
        code = "#AAAAAA";
        break;
      case "8":
        code = "#555555";
        break;
      case "9":
        code = "#5555FF";
        break;
      case "A":
        code = "#55FF55";
        break;
      case "B":
        code = "#55FFFF";
        break;
      case "C":
        code = "#FF5555";
        break;
      case "D":
        code = "#FF55FF";
        break;
      case "E":
        code = "#FFFF55";
        break;
      case "F":
        code = "#FFFFFF";
        break;
    }

    return code;
  };

  // TODO 完善其它命令
  const cmdTool = (cmd: string) => {
    let tmpStack = [...stack];
    tmpStack.push(`${pwd}>${cmd}`);
    let list = cmd.split(" ");
    const type = list[0].trim().toLowerCase();
    let arg = list.splice(1, list.length).join(" ") || "";
    arg = arg.trim();
    switch (type) {
      case "cls":
        tmpStack = [];
        break;
      case "help":
        const helpArr = [
          "CD             Displays the name of or changes the current directory.",
          "CLS            Clears the screen.",
          "COLOR          Sets the default console foreground and background colors.",
          "DATE           Displays or sets the date.",
          "DIR            Displays a list of files and subdirectories in a directory.",
          "ECHO           Displays messages, or turns command echoing on or off.",
          "EXIT           Quits the CMD.EXE program (command interpreter).",
          "HELP           Provides Help information for Windows commands.",
          "START          Starts a separate window to run a specified program or command.",
          "SYSTEMINFO     Displays machine specific properties and configuration.",
          "TIME           Displays or sets the system time.",
          "TITLE          Sets the window title for a CMD.EXE session.",
          "TYPE           Displays the contents of a text file.",
          "VER            Displays the Windows version.",
          "PYTHON         EXECUTE PYTHON CODE.",
          "EVAL           RUNS JavaScript statements.",
        ];
        for (let i = 0; i < helpArr.length; i++) {
          tmpStack.push(helpArr[i]);
        }
        break;
      case "date":
        tmpStack.push(
          "The current date is: " + new Date().toLocaleDateString()
        );
        break;
      case "time":
        tmpStack.push(
          "The current time is: " +
            new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }) +
            "." +
            Math.floor(Math.random() * 100)
        );
        break;
      case "exit":
        tmpStack = ["OS [Version 10.0.22000.51]", ""];
        dispatch(
          changeAppStatus({
            app: termial.action!,
            type: "close",
          })
        );
        break;
      case "systeminfo":
        const dvInfo = [
          "Host Name:                 BLUE",
          "OS Name:                   Win11React Dummys Edition",
          "OS Version:                10.0.22000 N/A Build 22000.51",
          "OS Manufacturer:           ",
          "OS Configuration:          Standalone Workstation",
          "OS Build Type:             Multiprocessor Free",
          "Registered Owner:          Blue",
          "Registered Organization:   N/A",
          "Product ID:                7H1S1-5AP1R-473DV-3R5I0N",
        ];

        for (let i = 0; i < dvInfo.length; i++) {
          tmpStack.push(dvInfo[i]);
        }
        break;
      case "color":
        let color = "#FFFFFF";
        let background = "#000000";
        let reg = /^[A-Fa-f0-9]+$/g;
        if (!arg || (arg.length < 3 && reg.test(arg))) {
          if (arg.length == 2) {
            color = colorCode(arg[1]);
            background = colorCode(arg[0]);
          } else if (arg.length == 1) {
            color = colorCode(arg[0]);
          }
          if (cmdContent.current) {
            cmdContent.current.style.backgroundColor = background;
            cmdContent.current.style.color = color;
          }
        } else {
          tmpStack.push(
            "Set the color of the background and the text for the console."
          );
          tmpStack.push("COLOR [arg]");
          tmpStack.push("arg\t\tSpecifies the color for the console output");
          tmpStack.push(
            "The color attribute is a combination of the following values:"
          );
          // tmpStack.push("0\t\tBlack");
          tmpStack.push("1\t\tBlue");
          tmpStack.push("2\t\tGreen");
          tmpStack.push("3\t\tCyan");
          tmpStack.push("4\t\tRed");
          tmpStack.push("5\t\tMagenta");
          tmpStack.push("6\t\tBrown");
          tmpStack.push("7\t\tLight Gray");
          tmpStack.push("8\t\tDark Gray");
          tmpStack.push("9\t\tLight Blue");
          tmpStack.push("A\t\tLight Green");
          tmpStack.push("B\t\tLight Cyan");
          tmpStack.push("C\t\tLight Red");
          tmpStack.push("D\t\tLight Magenta");
          tmpStack.push("E\t\tYellow");
          tmpStack.push("F\t\tWhite");
          tmpStack.push(
            "Example: COLOR 0a for black text on a green background"
          );
        }
        break;
      default:
        tmpStack.push(
          `'${type}' is not recognized as an internal or external command,`
        );
        tmpStack.push("operable program or batch file.");
        tmpStack.push("");
        tmpStack.push('Type "help" for available commands');
        break;
    }
    if (type.length > 0) {
      tmpStack.push("");
    }
    setStack(tmpStack);
  };

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
      <div className="window-screen flex">
        <div className="reset-window h-full flex-grow text-gray-100">
          <div
            className="cmd-content w-full box-border overflow-y-scroll win-scroll prtclk"
            id="cmdContent"
            data-action="hover"
            ref={cmdContent}
            onClick={hoverHandle}
            onMouseOver={hoverHandle}
          >
            <div className="w-full h-max pb-12">
              {stack.map((line, i) => {
                return (
                  <pre key={i} className="cmd-line">
                    {line}
                  </pre>
                );
              })}
              <div className="cmd-line actmd">
                {pwd}&gt;
                <div
                  ref={cmdline}
                  className="ipcmd"
                  contentEditable
                  spellCheck="false"
                  id="currentCmd"
                  data-action="enter"
                  onKeyDown={enterHandle}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
