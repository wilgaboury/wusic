import { Outlet } from "@solidjs/router";
import { Component } from "solid-js";

import { Navbar, NavbarItem } from "../common/Navbar";

const PlayerApp: Component = () => {
  return (
    <>
      <Navbar>
        <NavbarItem title="Search" />
        <NavbarItem title="Albums" />
        <NavbarItem title="Playlists" />
        <NavbarItem title="Playlist" />
      </Navbar>
      <div style={{ "flex-grow": 1 }}>
        <Outlet />
      </div>
    </>
  );
};

export default PlayerApp;
