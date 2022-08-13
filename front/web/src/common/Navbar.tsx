import { Component, ParentProps } from "solid-js";

import styles from "./Navbar.module.css";

interface NavbarItemProps {
  title: string;
  onclick?: () => void;
}

export const NavbarItem: Component<NavbarItemProps> = (props) => {
  return (
    <div class={`${styles.NavbarItem}`}>
      {props.title}
      <div class={styles.NavbarItemLine} />
    </div>
  );
};

export const Navbar: Component<ParentProps> = (props) => {
  return <div class={styles.Navbar}>{props.children}</div>;
};
