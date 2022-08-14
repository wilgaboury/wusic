import { Navigate, Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";

import styles from "./App.module.css";
import {
  AudioPlayerContext,
  makeAudioPlayerContext,
} from "./common/AudioPlayerContext";
import { AudioPlayer } from "./common/Footer";

import ArtistsPage from "./player/ArtistsPage";

const PlayerApp = lazy(() => import("./player/PlayerApp"));

const App: Component = () => {
  return (
    <div class={styles.App}>
      <AudioPlayerContext.Provider value={makeAudioPlayerContext()}>
        <div style={{ "flex-grow": 1, width: "100%" }}>
          <Routes>
            <Route path="/" component={() => <Navigate href="/player" />} />
            <Route path="/player" component={PlayerApp}>
              <Route
                path="/"
                component={() => <Navigate href="/player/search" />}
              />
              <Route path="/search" />
              <Route path="/artists" component={ArtistsPage} />
              <Route path="/artist/:id" />
              <Route path="/album/:id" />
              <Route path="/playlists" />
              <Route path="/queue" />
            </Route>
            <Route path="/manager">
              <div>Nothing to see here yet!</div>
            </Route>
          </Routes>
        </div>
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    </div>
  );
};

export default App;
