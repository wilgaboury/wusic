/* @refresh reload */
import "./index.css";

import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

import App from "./App";

interface BoxIconProps {
  type?: "regular" | "solid" | "logo";
  name?: string; // adjust|alarms|etc....
  color?: string; //blue|red|etc...
  size?: string; // xs|sm|md|lg|cssSize
  rotate?: string; // 90|180|270
  flip?: "horizontal" | "vertical";
  border?: "square" | "circle";
  animation?: string; // spin|tada|etc...
  pull?: "left" | "right";
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "video-js": JSX.IntrinsicElements["video"];
      "box-icon": BoxIconProps;
    }
  }
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
