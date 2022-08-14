import { Outlet } from "@solidjs/router";
import { Component } from "solid-js";

import { Navbar, NavbarItem } from "../common/Navbar";

import styles from "./PlayerApp.module.css";

const PlayerApp: Component = () => {
  return (
    <div style={styles.PlayerAppContainer}>
      <Navbar>
        <NavbarItem title="Search" navLoc="/player/search" />
        <NavbarItem title="Artists" navLoc="/player/artists" />
        <NavbarItem title="Playlists" navLoc="/player/playlists" />
        <NavbarItem title="Queue" navLoc="/player/queue" />
      </Navbar>
      <div style={{ "flex-grow": 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default PlayerApp;
