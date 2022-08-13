import { Navigate, Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";

import styles from "./App.module.css";
import {
  AudioPlayerContext,
  makeAudioPlayerContext,
} from "./common/AudioPlayerContext";
import { AudioPlayer } from "./Footer";

const PlayerApp = lazy(() => import("./player/PlayerApp"));

const App: Component = () => {
  return (
    <div class={styles.App}>
      <AudioPlayerContext.Provider value={makeAudioPlayerContext()}>
        <div style={{ "flex-grow": 1 }} />
        <Routes>
          <Route path="player" component={PlayerApp}>
            <Route path="/">
              <Navigate href="/player/search" />
            </Route>
            <Route path="/search" />
            <Route path="/artists" />
            <Route path="/artist/:id" />
            <Route path="/album/:id" />
            <Route path="/playlists" />
            <Route path="/queue" />
          </Route>
          <Route path="manager">
            <div>Nothing to see here yet!</div>
          </Route>
        </Routes>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    </div>
  );
};

export default App;
