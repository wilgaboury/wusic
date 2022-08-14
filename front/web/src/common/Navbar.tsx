import { NavLink, useLocation } from "@solidjs/router";
import { Component, ParentProps } from "solid-js";

import styles from "./Navbar.module.css";

interface NavbarItemProps {
  title: string;
  navLoc: string;
}

export const NavbarItem: Component<NavbarItemProps> = (props) => {
  const location = useLocation();
  const isSelected = () => location.pathname.includes(props.navLoc);
  const titleColor = () =>
    isSelected() ? "var(--highlight-color)" : "var(--text-color)";

  return (
    <NavLink href={props.navLoc} style={{ "text-decoration": "none" }}>
      <div class={`${styles.NavbarItem}`} style={{ color: titleColor() }}>
        {props.title}
        <div class={styles.NavbarItemLine} />
      </div>
    </NavLink>
  );
};

export const Navbar: Component<ParentProps> = (props) => {
  return <div class={styles.Navbar}>{props.children}</div>;
};
